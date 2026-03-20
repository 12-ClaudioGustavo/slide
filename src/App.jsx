import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundMusic from './components/BackgroundMusic';
import ParticlesBG from './components/ParticlesBG';
import MessageOverlay from './components/MessageOverlay';

const MESSAGES = [
    "Feliz Aniversário!",
    "Muitas felicidades!",
    "Que Deus abençoe sua vida!",
    "Um brinde à sua vida!",
    "Momentos inesquecíveis...",
    "Celebrando você!",
    "Amor e alegria hoje e sempre.",
    "Parabéns pelo seu dia!"
];

const TRANSITIONS = [
    { // Fade
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 1.5 }
    },
    { // Zoom Out
        initial: { opacity: 0, scale: 1.2 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        transition: { duration: 2, ease: "easeInOut" }
    },
    { // Slide
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
        transition: { duration: 1.2, ease: "circOut" }
    },
    { // Blur
        initial: { opacity: 0, filter: 'blur(20px)' },
        animate: { opacity: 1, filter: 'blur(0px)' },
        exit: { opacity: 0, filter: 'blur(10px)' },
        transition: { duration: 2 }
    }
];

function App() {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transitionIndex, setTransitionIndex] = useState(0);
    const [currentMessage, setCurrentMessage] = useState("");
    const [showProgress, setShowProgress] = useState(true);

    useEffect(() => {
        // Vite-specific way to load all images from a directory
        const imageModules = import.meta.glob('/public/img/*.{jpg,jpeg,JPG,JPEG}', {
            eager: true,
            query: '?url'
        });

        const imagePaths = Object.values(imageModules).map(mod => {
            const url = typeof mod === 'string' ? mod : mod.default;
            // Strip /public because assets in public/ are served from root /
            return url.startsWith('/public/') ? url.substring(7) : url;
        });

        // Shuffle images
        const shuffled = [...imagePaths].sort(() => Math.random() - 0.5);

        // Fallback if no images found
        if (shuffled.length === 0) {
            console.warn("Nenhuma imagem encontrada na pasta /public/img/");
        }

        setImages(shuffled);
    }, []);

    useEffect(() => {
        if (images.length === 0) return;

        const interval = setInterval(() => {
            // Pick random transition
            setTransitionIndex(Math.floor(Math.random() * TRANSITIONS.length));

            // Update index
            setCurrentIndex((prev) => (prev + 1) % images.length);

            // Randomly show a message (30% chance)
            if (Math.random() > 0.7) {
                setCurrentMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
                setTimeout(() => setCurrentMessage(""), 4000);
            }
        }, 5000); // 5 seconds per slide

        return () => clearInterval(interval);
    }, [images]);

    if (images.length === 0) {
        return (
            <div className="h-full w-full bg-black flex flex-col items-center justify-center p-10 text-center">
                <h1 className="text-2xl font-light text-white/50 mb-4 tracking-widest">CARREGANDO MEMÓRIAS...</h1>
                <p className="text-sm text-white/30 max-w-md">Certifique-se de que existem imagens .jpg na pasta /public/img/</p>
                <div className="mt-8 w-48 h-px bg-white/10 overflow-hidden">
                    <motion.div
                        className="h-full bg-white/40"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                </div>
            </div>
        );
    }

    const currentTransition = TRANSITIONS[transitionIndex];

    return (
        <main className="relative h-full w-full bg-black overflow-hidden flex items-center justify-center">
            <ParticlesBG />
            <BackgroundMusic src="/music.mp3" />
            <MessageOverlay message={currentMessage} isVisible={!!currentMessage} />

            <AnimatePresence mode="wait">
                <motion.div
                    key={images[currentIndex]}
                    initial={currentTransition.initial}
                    animate={currentTransition.animate}
                    exit={currentTransition.exit}
                    transition={currentTransition.transition}
                    className="absolute inset-0 flex items-center justify-center overflow-hidden"
                >
                    {/* Ken Burns Effect Wrapper */}
                    <motion.div
                        animate={{
                            scale: [1, 1.15],
                            x: [0, Math.random() > 0.5 ? 20 : -20],
                            y: [0, Math.random() > 0.5 ? 20 : -20],
                        }}
                        transition={{
                            duration: 8,
                            ease: "linear",
                        }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        <img
                            src={images[currentIndex]}
                            alt={`Slide ${currentIndex}`}
                            className="max-h-full max-w-full object-contain shadow-2xl"
                        />
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Cinematic Vignette */}
            <div className="absolute inset-0 pointer-events-none cinematic-shadow z-20" />

            {/* Progress Indicator */}
            <div className="absolute bottom-0 left-0 h-1 bg-white/30 z-30 transition-all duration-[5000ms] linear"
                style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
            />
        </main>
    );
}

export default App;
