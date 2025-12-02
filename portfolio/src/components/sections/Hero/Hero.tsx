'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import AnimatedText from '../../ui/AnimatedText/AnimatedText';
import CodeDisplay from '../../ui/CodeDisplay/CodeDisplay';
import styles from './Hero.module.css';

const Hero = () => {
    const { isDark } = useTheme();
    const [scrollProgress, setScrollProgress] = useState(0);
    const heroRef = useRef<HTMLElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    // Scroll progress
    useEffect(() => {
        const handleScroll = () => {
            if (!heroRef.current) return;

            const rect = heroRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Mouse parallax
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Visibility on mount
    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleContactClick = () => {
        const contactSection = document.querySelector('#Contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleResumeClick = () => {
        window.open('https://drive.google.com/file/d/1jrKmpeooPkSKZ2JSEyqj--HtjDsv4rCu/view?usp=drive_link', '_blank');
    };

    return (
        <section
            id="Home"
            ref={heroRef}
            className={`${styles.hero} ${isVisible ? styles.visible : ''}`}
            data-theme={isDark ? 'dark' : 'light'}
            style={{
                '--scroll-progress': scrollProgress,
                '--mouse-x': mousePosition.x,
                '--mouse-y': mousePosition.y,
            } as React.CSSProperties}
        >
            {/* Background Effects */}
            <div className={styles.heroBackground}>
                <div className={styles.gradientOrb} />
                <div className={styles.particleField} />
                <div className={styles.scanLines} />
            </div>

            <div className={styles.heroContainer}>
                {/* Animated Title */}
                <div className={styles.titleSection}>
                    <h1 className={styles.mainTitle}>
                        <span className={styles.titlePrefix}>I&apos;m a</span>
                        <div className={styles.titleRotator}>
                            <span className={styles.rotatingText} data-text="Coder..">Coder..</span>
                            <span className={styles.rotatingText} data-text="Editor..">Editor..</span>
                            <span className={styles.rotatingText} data-text="Creator..">Creator..</span>
                        </div>
                    </h1>
                </div>

                {/* Subtitle */}
                <div className={styles.subtitleSection}>
                    <AnimatedText
                        text="Welcome to my portfolio !"
                        className={styles.animatedSubtitle}
                    />
                    <p className={styles.description}>
                        Greetings, tech enthusiasts! I&apos;m B.Neeraj Kumar.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className={styles.actionButtons}>
                    <button
                        className={`${styles.ctaButton} ${styles.primaryButton}`}
                        onClick={handleContactClick}
                        aria-label="Contact me"
                    >
                        <span className={styles.buttonText}>Contact me</span>
                        <span className={styles.buttonGlow} />
                        <span className={styles.buttonRipple} />
                    </button>

                    <button
                        className={`${styles.ctaButton} ${styles.secondaryButton}`}
                        onClick={handleResumeClick}
                        aria-label="View my resume"
                    >
                        <span className={styles.buttonText}>My Resume</span>
                        <span className={styles.buttonGlow} />
                        <span className={styles.buttonRipple} />
                    </button>
                </div>

                {/* Code Display */}
                <div className={styles.codeSection}>
                    <CodeDisplay />
                </div>

                {/* Scroll Indicator */}
                <div className={styles.scrollIndicator}>
                    <div className={styles.scrollLine}>
                        <div
                            className={styles.scrollProgress}
                            style={{ height: `${scrollProgress * 100}%` }}
                        />
                    </div>
                    <span className={styles.scrollText}>Scroll</span>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className={styles.decorativeElements}>
                <div className={styles.floatingShape} />
                <div className={styles.floatingShape} />
                <div className={styles.floatingShape} />
            </div>
        </section>
    );
};

export default Hero;