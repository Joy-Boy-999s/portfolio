'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        setIsAnimating(true);
        toggleTheme();

        // Reset animation state after animation completes
        setTimeout(() => setIsAnimating(false), 600);
    };

    return (
        <button
            className={`${styles.themeToggle} ${isAnimating ? styles.animating : ''}`}
            onClick={handleClick}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            data-theme={theme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <div className={styles.toggleContainer}>
                <div className={styles.toggleTrack}>
                    {/* Sun Icon */}
                    <div className={styles.iconContainer}>
                        <div className={`${styles.icon} ${styles.sun}`}>
                            <div className={styles.sunCore}></div>
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className={styles.sunRay}
                                    style={{ '--ray-index': i } as React.CSSProperties}
                                />
                            ))}
                        </div>

                        {/* Moon Icon */}
                        <div className={`${styles.icon} ${styles.moon}`}>
                            <div className={styles.moonBody}></div>
                            <div className={styles.moonCrater}></div>
                            <div className={styles.moonCrater}></div>
                            <div className={styles.moonCrater}></div>
                        </div>
                    </div>

                    {/* Toggle Switch */}
                    <div className={styles.toggleSwitch}>
                        <div className={styles.switchKnob}></div>
                    </div>
                </div>
            </div>

            {/* Glow Effect */}
            <div className={styles.glowEffect}></div>
        </button>
    );
};

export default ThemeToggle;