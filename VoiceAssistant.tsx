
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';

interface Props {
  makerName: string;
  brandName: string;
}

// Simple decoding utility for PCM
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

const VoiceAssistant: React.FC<Props> = ({ makerName, brandName }) => {
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening'>('idle');
  const [transcriptions, setTranscriptions] = useState<string[]>([]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);

  const startAssistant = async () => {
    if (isListening) {
      stopAssistant();
      return;
    }

    try {
      setStatus('connecting');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus('listening');
            setIsListening(true);
            
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message) => {
             if (message.serverContent?.outputTranscription) {
               const text = message.serverContent.outputTranscription.text;
               setTranscriptions(prev => [...prev.slice(-4), `AI: ${text}`]);
             }
             if (message.serverContent?.inputTranscription) {
               const text = message.serverContent.inputTranscription.text;
               setTranscriptions(prev => [...prev.slice(-4), `You: ${text}`]);
             }

             const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData.data;
             if (base64Audio) {
               nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
               const audioBuffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
               const source = outputCtx.createBufferSource();
               source.buffer = audioBuffer;
               source.connect(outputCtx.destination);
               source.start(nextStartTimeRef.current);
               nextStartTimeRef.current += audioBuffer.duration;
               sourcesRef.current.add(source);
             }

             if (message.serverContent?.interrupted) {
               sourcesRef.current.forEach(s => s.stop());
               sourcesRef.current.clear();
               nextStartTimeRef.current = 0;
             }
          },
          onerror: (e) => {
            console.error('Gemini error:', e);
            stopAssistant();
          },
          onclose: () => {
            stopAssistant();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          inputAudioTranscription: {},
          systemInstruction: `You are a warm, expert Indian vegetarian cooking assistant named "Talk Veg". You were created by ${makerName} for the "${brandName}" application. You have deep knowledge of Indian regional kitchens: Tadka techniques, spice balances, Ayurvedic seasonal wisdom, and regional specialties. Your tone is encouraging, hospitable, and warming. Help users master the soul of Indian vegetarian food.`,
        }
      });

      sessionRef.current = await sessionPromise;

    } catch (err) {
      console.error('Failed to start assistant', err);
      setStatus('idle');
    }
  };

  const stopAssistant = () => {
    if (sessionRef.current) {
      sessionRef.current.close?.();
      sessionRef.current = null;
    }
    setIsListening(false);
    setStatus('idle');
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
  };

  return (
    <section id="talk" className="py-24 bg-brand-accent/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white p-16 rounded-brand shadow-2xl relative overflow-hidden border border-brand-primary/10">
          <div className="absolute top-0 left-0 w-full h-2 brand-gradient"></div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Voice of Tradition</h2>
          <p className="text-stone-600 mb-12 max-w-lg mx-auto text-lg leading-relaxed">
            Unsure about the Tadka? Or need to balance the spices?
            Ask {makerName}'s expert chef for guidance in real-time.
          </p>

          <div className="flex flex-col items-center gap-10">
            <button 
              onClick={startAssistant}
              disabled={status === 'connecting'}
              className={`w-36 h-36 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
                isListening ? 'bg-brand-primary hover:scale-110' : 'bg-stone-900 hover:bg-black'
              } ${status === 'connecting' ? 'opacity-50 cursor-not-allowed' : ''} group relative`}
            >
              <div className={`absolute inset-0 rounded-full bg-brand-fresh opacity-20 ${isListening ? 'animate-ping' : ''}`}></div>
              {isListening ? (
                <div className="flex gap-1.5 items-center">
                  <div className="w-1.5 h-8 bg-white rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-12 bg-white rounded-full animate-bounce delay-150"></div>
                  <div className="w-1.5 h-8 bg-white rounded-full animate-bounce delay-75"></div>
                </div>
              ) : (
                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              )}
            </button>

            <div className="text-xs font-bold uppercase tracking-[0.3em] text-brand-primary">
              {status === 'idle' && 'Tap to start culinary dialogue'}
              {status === 'connecting' && 'Opening the kitchen...'}
              {status === 'listening' && 'Listening to your kitchen secrets...'}
            </div>

            <div className="w-full max-w-lg h-40 bg-brand-accent/30 rounded-3xl p-6 overflow-y-auto text-left flex flex-col gap-4 border border-brand-primary/10 shadow-inner">
              {transcriptions.length === 0 ? (
                <span className="text-stone-300 italic text-center w-full block mt-8 font-light">Your conversation will flow here...</span>
              ) : (
                transcriptions.map((t, i) => (
                  <div key={i} className={`text-sm flex gap-3 ${t.startsWith('You:') ? 'text-brand-primary font-bold' : 'text-stone-600'}`}>
                    <span className="font-bold min-w-[3rem] text-[10px] uppercase tracking-widest pt-1">{t.split(':')[0]}</span>
                    <span className="leading-relaxed">{t.split(':')[1]}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoiceAssistant;
