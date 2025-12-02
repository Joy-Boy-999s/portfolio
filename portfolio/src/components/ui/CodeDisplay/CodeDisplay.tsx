'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import useElementRotation from '../../../hooks/useElementRotation';
import styles from './CodeDisplay.module.css';

const CodeDisplay = () => {
    const { isDark } = useTheme();

    // use nullable DOM types
    const codeRef = useRef<HTMLDivElement | null>(null);
    const cursorRef = useRef<HTMLSpanElement | null>(null);

    // Cast when passing to the hook (HTMLDivElement extends HTMLElement)
    useElementRotation(codeRef as React.RefObject<HTMLElement>);

    // Cursor blink animation
    useEffect(() => {
        if (!cursorRef.current) return;

        const interval = window.setInterval(() => {
            if (cursorRef.current) {
                cursorRef.current.style.opacity =
                    cursorRef.current.style.opacity === '0' ? '1' : '0';
            }
        }, 530);

        return () => window.clearInterval(interval);
    }, []);

    // Typing animation
    useEffect(() => {
        const lines = [
            '#About me',
            'name = "B.Neeraj Kumar"',
            'job = "Aspiring Software Developer"',
            'hobby = "Turning creative ideas "',
            '         "into reality through code"',
            'fav_lang = "Python"',
            '',
            'print(f"Hi there! I\\\'m \\{name\\}. I\\\'m an ")',
            '      f"\\{job\\} who enjoys \\{hobby\\} as a hobby"',
            '      f"with my favourite language \\{fav_lang\\}")',
            ''
        ];

        const codeElement = codeRef.current?.querySelector(`.${styles.codeContent}`);
        if (!codeElement) return;

        let currentLine = 0;
        let currentChar = 0;
        const speed = 30;

        const typeLine = () => {
            if (currentLine >= lines.length) return;

            const line = lines[currentLine];
            if (currentChar <= line.length) {
                const lineElement = codeElement.children[currentLine] as HTMLElement;
                if (lineElement) {
                    const lineNumber = (currentLine + 1).toString().padStart(2, ' ');
                    lineElement.innerHTML = `<span class="${styles.lineNumber}">${lineNumber}</span>${line.substring(0, currentChar)}`;
                    lineElement.style.opacity = '1';
                }
                currentChar++;
                setTimeout(typeLine, speed);
            } else {
                currentLine++;
                currentChar = 0;
                setTimeout(typeLine, speed * 2);
            }
        };

        const timeout = window.setTimeout(() => {
            typeLine();
        }, 1000);

        return () => window.clearTimeout(timeout);
    }, []);

    return (
        <div className={styles.codeDisplay}>
            {/* Window Frame */}
            <div className={styles.windowFrame}>
                <div className={styles.windowHeader}>
                    <div className={styles.windowControls}>
                        <div className={styles.controlClose} />
                        <div className={styles.controlMinimize} />
                        <div className={styles.controlMaximize} />
                    </div>
                    <span className={styles.windowTitle}>about_me.py</span>
                </div>
                <div className={styles.windowContent}>
                    {/* 3D Code Container */}
                    <div
                        ref={codeRef}
                        className={styles.codeContainer}
                        data-theme={isDark ? 'dark' : 'light'}
                    >
                        {/* Border Effects */}
                        <div className={styles.borderEffect} />
                        <div className={styles.borderEffect} />

                        {/* Code Content */}
                        <div className={styles.codeContent}>
                            {[...Array(12)].map((_, i) => (
                                <div
                                    key={i}
                                    className={styles.codeLine}
                                    style={{ opacity: 0 }}
                                />
                            ))}

                            {/* Cursor */}
                            <div className={styles.cursorLine}>
                                <span className={styles.lineNumber}>12</span>
                                <span ref={cursorRef} className={styles.cursor}>_</span>
                            </div>
                        </div>

                        {/* Glow Effect */}
                        <div className={styles.codeGlow} />
                    </div>
                </div>
            </div>

            {/* Floating Code Particles */}
            <div className={styles.floatingParticles}>
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className={styles.codeParticle}
                        style={{ '--particle-index': i } as React.CSSProperties}
                    >
                        {['<', '/>', '{', '}', '(', ')', ';', '='][i]}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CodeDisplay;
