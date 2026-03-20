import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MessageOverlay = ({ message, isVisible }) => {
    return (
        <AnimatePresence>
            {isVisible && message && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 1.1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="fixed inset-0 flex items-center justify-center z-40 px-6 pointer-events-none"
                >
                    <div className="text-center">
                        <motion.h2
                            className="text-4xl md:text-7xl font-serif text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] font-light tracking-widest italic"
                            initial={{ letterSpacing: "0.1em" }}
                            animate={{ letterSpacing: "0.2em" }}
                            transition={{ duration: 5, ease: "linear" }}
                        >
                            {message}
                        </motion.h2>
                        <motion.div
                            className="mt-6 h-px w-24 md:w-48 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MessageOverlay;
