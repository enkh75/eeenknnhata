import React, { useState, useRef, useEffect } from 'react';

const GlobalAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const timerIDRef = useRef<number | null>(null);
  const [volume, setVolume] = useState(0.3);

  const pentatonicScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C Major

  const playTone = (time: number) => {
    if (!audioContextRef.current) return;
    const osc = audioContextRef.current.createOscillator();
    const gain = audioContextRef.current.createGain();
    
    const freq = pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];
    const octave = Math.random() > 0.6 ? 1 : 0.5;
    
    osc.frequency.value = freq * octave;
    osc.type = 'sine';
    
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 2);
    
    osc.connect(gain);
    gain.connect(audioContextRef.current.destination);
    
    osc.start(time);
    osc.stop(time + 2);
  };

  const scheduler = () => {
    if (!audioContextRef.current) return;
    while (nextNoteTimeRef.current < audioContextRef.current.currentTime + 0.1) {
      playTone(nextNoteTimeRef.current);
      nextNoteTimeRef.current += Math.random() > 0.7 ? 0.25 : 0.5;
    }
    timerIDRef.current = window.setTimeout(scheduler, 25);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      if (timerIDRef.current) clearTimeout(timerIDRef.current);
      audioContextRef.current?.close();
      audioContextRef.current = null;
      setIsPlaying(false);
    } else {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
      nextNoteTimeRef.current = audioContextRef.current.currentTime + 0.1;
      scheduler();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (timerIDRef.current) clearTimeout(timerIDRef.current);
      audioContextRef.current?.close();
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-fade-in">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-full shadow-2xl border border-white/10 transition-all duration-300 ${isPlaying ? 'bg-indigo-900/90 backdrop-blur-md w-auto' : 'bg-slate-900/50 hover:bg-slate-900 w-12 h-12 justify-center overflow-hidden'}`}>
        
        <button 
          onClick={toggleMusic}
          className="text-white hover:text-indigo-400 transition-colors flex-shrink-0"
        >
          {isPlaying ? (
            <svg className="w-6 h-6 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 18V5l12 6-12 7z"/></svg>
          )}
        </button>

        {isPlaying && (
          <div className="flex items-center gap-2 pr-2">
             <div className="flex items-end gap-0.5 h-4 w-12">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="w-1 bg-indigo-400 animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDuration: `${0.5 + Math.random()}s` }}></div>
               ))}
             </div>
             <span className="text-xs font-mono text-indigo-200 whitespace-nowrap">AI Ambience</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalAudioPlayer;