'use client';

import { useRef, useState, useEffect } from 'react';
import styles from './AnimatedText.module.css';

interface AnimatedTextProps {
    text: string;
    className?: string;
    speed?: number;
    onHover?: boolean;
}

const AnimatedText = ({
    text,
    className = '',
    speed = 30,
    onHover = true
}: AnimatedTextProps) => {
    const textRef = useRef<HTMLDivElement | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [displayText, setDisplayText] = useState(text);

    // Use a number | null for browser setInterval IDs
    const animationRef = useRef<number | null>(null);

    const letters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

    const startAnimation = () => {
        if (isAnimating) return;

        setIsAnimating(true);
        let iteration = 0;
        const originalText = text;

        // Clear any previous interval safely
        if (animationRef.current !== null) {
            window.clearInterval(animationRef.current);
            animationRef.current = null;
        }

        animationRef.current = window.setInterval(() => {
            setDisplayText(
                originalText
                    .split('')
                    .map((_, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join('')
            );

            if (iteration >= originalText.length) {
                if (animationRef.current !== null) {
                    window.clearInterval(animationRef.current);
                    animationRef.current = null;
                }
                setIsAnimating(false);
            }

            // controls how quickly letters lock in; keep as fractional step if desired
            iteration += 1 / 3;
        }, speed);
    };

    const handleInteraction = () => {
        if (onHover && !isAnimating) {
            startAnimation();
        }
    };

    // Auto-animate on mount
    useEffect(() => {
        const timeout = window.setTimeout(() => {
            startAnimation();
        }, 1000);

        return () => {
            window.clearTimeout(timeout);
            if (animationRef.current !== null) {
                window.clearInterval(animationRef.current);
                animationRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // intentional: run once on mount

    // Keep displayed text in sync when the `text` prop changes
    useEffect(() => {
        setDisplayText(text);
    }, [text]);

    return (
        <div
            ref={textRef}
            className={`${styles.animatedText} ${className} ${isAnimating ? styles.animating : ''
                }`}
            onMouseEnter={handleInteraction}
            onTouchStart={handleInteraction}
            data-text={text}
        >
            {displayText}
            <span className={styles.cursor} />
            <div className={styles.glowEffect} />
        </div>
    );
};

export default AnimatedText;
