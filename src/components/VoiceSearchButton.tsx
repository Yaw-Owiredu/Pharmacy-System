import React, { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';

interface VoiceSearchButtonProps {
  onTranscript: (text: string) => void;
  className?: string;
  tooltipAlign?: 'left' | 'right' | 'center';
}

export const VoiceSearchButton: React.FC<VoiceSearchButtonProps> = ({
  onTranscript,
  className = '',
  tooltipAlign = 'center',
}) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
    }
  }, []);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Web Speech API not supported');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setError(null);
    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setError('Microphone blocked');
        } else {
          setError(`Error: ${event.error}`);
        }
        setIsListening(false);
        setTimeout(() => setError(null), 3000);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          onTranscript(transcript);
        }
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setError('Failed to start speech recognition');
      setIsListening(false);
      setTimeout(() => setError(null), 3000);
    }
  };

  if (!isSupported) {
    return null;
  }

  const tooltipAlignClass = 
    tooltipAlign === 'left' ? 'right-0' :
    tooltipAlign === 'right' ? 'left-0' :
    'left-1/2 -translate-x-1/2';

  return (
    <div className={`relative flex items-center leading-none ${className}`}>
      <button
        type="button"
        onClick={startListening}
        className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer flex items-center justify-center ${
          isListening
            ? 'bg-rose-50 border-rose-300 text-rose-600 dark:bg-rose-950/20 dark:border-rose-900 absolute-pulse shadow-[0_0_8px_rgba(244,63,94,0.4)] ring-1 ring-rose-500/20'
            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-900/40 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/60'
        }`}
        title={isListening ? 'Listening... Speak now' : 'Search by Voice'}
        aria-label="Search items by voice input"
      >
        {isListening ? (
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500 items-center justify-center">
              <Mic className="w-2.5 h-2.5 text-white animate-pulse" />
            </span>
          </span>
        ) : (
          <Mic className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Listening State UI Overlay Tooltip */}
      {isListening && (
        <span className={`absolute bottom-full mb-1.5 ${tooltipAlignClass} bg-slate-900/95 dark:bg-slate-800 text-white text-[9px] font-bold px-2 py-1 rounded-md shadow-lg pointer-events-none whitespace-nowrap z-50 flex items-center gap-1 animate-bounce`}>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-550 animate-ping" />
          🎙️ Listening... speak now
        </span>
      )}

      {error && (
        <span className={`absolute bottom-full mb-1.5 ${tooltipAlignClass} bg-rose-600 text-white text-[9px] font-bold px-2 py-1 rounded-md shadow-lg pointer-events-none whitespace-nowrap z-50`}>
          ⚠️ {error}
        </span>
      )}
    </div>
  );
};
