'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './GlitchText.module.css';

interface GlitchTextProps {
    text: string;
    className?: string;
    intensity?: number;
    duration?: number;
}

const GlitchText = ({
    text,
    className = '',
    intensity = 1,
    duration = 500
}: GlitchTextProps) => {
    const [isGlitching, setIsGlitching] = useState(false);
    const glitchRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startGlitch = () => {
        if (isGlitching) return;

        setIsGlitching(true);
        if (intervalRef.current) {
            clearTimeout(intervalRef.current);
        }

        intervalRef.current = setTimeout(() => {
            setIsGlitching(false);
        }, duration);
    };

    // Random glitch effect
    useEffect(() => {
        const randomGlitch = () => {
            const delay = Math.random() * 5000 + 2000;
            const timeout = setTimeout(() => {
                startGlitch();
                randomGlitch();
            }, delay);

            return () => clearTimeout(timeout);
        };

        const cleanup = randomGlitch();
        return cleanup;
    }, []);

    // Manual glitch on hover
    const handleMouseEnter = () => {
        startGlitch();
    };

    return (
        <div
            ref={glitchRef}
            className={`${styles.glitchText} ${className} ${isGlitching ? styles.glitching : ''}`}
            onMouseEnter={handleMouseEnter}
            data-intensity={intensity}
        >
            {/* Main text */}
            <span className={styles.mainText}>{text}</span>

            {/* Glitch layers */}
            <span className={styles.glitchLayer} aria-hidden="true">{text}</span>
            <span className={styles.glitchLayer} aria-hidden="true">{text}</span>
            <span className={styles.glitchLayer} aria-hidden="true">{text}</span>
            <span className={styles.glitchLayer} aria-hidden="true">{text}</span>

            {/* Scan line */}
            <div className={styles.scanLine} />
        </div>
    );
};

export default GlitchText;