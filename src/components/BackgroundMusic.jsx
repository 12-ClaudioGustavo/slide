import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3; // Low volume as requested
        }
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Auto-play blocked", e));
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-black/40 backdrop-blur-md p-3 rounded-full border border-white/10 hover:bg-black/60 transition-all group">
            <audio ref={audioRef} src={src} loop />

            <button
                onClick={togglePlay}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                title={isPlaying ? "Pausar Música" : "Tocar Música"}
            >
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="fill-current" />}
            </button>

            <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                title={isMuted ? "Desmutar" : "Mutar"}
            >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-xs font-medium uppercase tracking-widest text-white/70 pr-2">
                Música de Fundo
            </span>
        </div>
    );
};

export default BackgroundMusic;
