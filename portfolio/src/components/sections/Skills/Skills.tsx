'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import SkillCircle from '../../ui/SkillCircle/SkillCircle';
import GlitchText from '../../ui/GlitchText/GlitchText';
import styles from './Skills.module.css';

const Skills = () => {
    const { isDark } = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [animatedPercentages, setAnimatedPercentages] = useState<Record<string, number>>({});
    const skillsRef = useRef<HTMLDivElement>(null);
    const animationRefs = useRef<Record<string, NodeJS.Timeout>>({});

    const skills = [
        { id: 'javascript', percentage: 79, name: 'JavaScript', color: '#F7DF1E', icon: 'bx bxl-javascript' },
        { id: 'python', percentage: 85, name: 'PYTHON', color: '#3776AB', icon: 'bx bxl-python' },
        { id: 'webdev', percentage: 80, name: 'Web Development', color: '#8B5CF6', icon: 'bx bx-code-alt' },
        { id: 'c', percentage: 15, name: 'C', color: '#A8B9CC', icon: 'bx bx-cube' },
        { id: 'java', percentage: 65, name: 'JAVA', color: '#007396', icon: 'bx bxl-java' },
        { id: 'automation', percentage: 50, name: 'Automation', color: '#FF4081', icon: 'bx bx-cog' },
    ];

    // Intersection Observer for scroll animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);

                        // Animate each skill percentage
                        skills.forEach((skill, index) => {
                            animationRefs.current[skill.id] = setTimeout(() => {
                                animatePercentage(skill.id, skill.percentage);
                            }, index * 200);
                        });
                    } else {
                        setIsVisible(false);
                        // Clear all animations when leaving
                        Object.values(animationRefs.current).forEach(clearTimeout);
                        setAnimatedPercentages({});
                    }
                });
            },
            { threshold: 0.3, rootMargin: '50px' }
        );

        if (skillsRef.current) {
            observer.observe(skillsRef.current);
        }

        return () => {
            observer.disconnect();
            Object.values(animationRefs.current).forEach(clearTimeout);
        };
    }, []);

    const animatePercentage = (id: string, target: number) => {
        let start = 0;
        const duration = 1500;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);

            setAnimatedPercentages(prev => ({
                ...prev,
                [id]: current
            }));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    };

    return (
        <section
            id="Skills"
            ref={skillsRef}
            className={`${styles.skills} ${isVisible ? styles.visible : ''}`}
            data-theme={isDark ? 'dark' : 'light'}
        >
            {/* Background Pattern */}
            <div className={styles.backgroundPattern}>
                <div className={styles.patternGrid} />
                <div className={styles.patternDots} />
            </div>

            <div className={styles.skillsContainer}>
                {/* Section Header */}
                <div className={styles.sectionHeader}>
                    <GlitchText text="My Skills" className={styles.sectionTitle} />
                    <div className={styles.titleUnderline}>
                        <div className={styles.underlineFill} />
                    </div>
                    <p className={styles.sectionSubtitle}>
                        Technologies I work with and my proficiency levels
                    </p>
                </div>

                {/* Skills Grid */}
                <div className={styles.skillsGrid}>
                    {skills.map((skill, index) => (
                        <div
                            key={skill.id}
                            className={`${styles.skillCard} ${isVisible ? styles.animateIn : ''}`}
                            style={{
                                '--animation-delay': `${index * 100}ms`,
                                '--skill-color': skill.color,
                            } as React.CSSProperties}
                        >
                            <div className={styles.skillCardInner}>
                                {/* Skill Icon */}
                                <div className={styles.skillIconContainer}>
                                    <div className={styles.skillIconBackground} />
                                    <i className={`${skill.icon} ${styles.skillIcon}`} />
                                    <div className={styles.skillIconGlow} />
                                </div>

                                {/* Skill Circle */}
                                <SkillCircle
                                    id={skill.id}
                                    percentage={animatedPercentages[skill.id] || 0}
                                    name={skill.name}
                                    color={skill.color}
                                />

                                {/* Skill Info */}
                                <div className={styles.skillInfo}>
                                    <h3 className={styles.skillName}>{skill.name}</h3>
                                    <div className={styles.skillLevel}>
                                        <div className={styles.levelBar}>
                                            <div
                                                className={styles.levelFill}
                                                style={{
                                                    width: `${animatedPercentages[skill.id] || 0}%`,
                                                    backgroundColor: skill.color,
                                                }}
                                            />
                                        </div>
                                        <span className={styles.levelText}>
                                            {animatedPercentages[skill.id] || 0}%
                                        </span>
                                    </div>
                                </div>

                                {/* Hover Effect */}
                                <div className={styles.skillHoverEffect}>
                                    <div className={styles.hoverRing} />
                                    <div className={styles.hoverParticles}>
                                        {[...Array(6)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={styles.particle}
                                                style={{
                                                    '--particle-index': i,
                                                    '--particle-color': skill.color,
                                                } as React.CSSProperties}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Skills Legend */}
                <div className={styles.skillsLegend}>
                    <div className={styles.legendItem}>
                        <div className={styles.legendIndicator} style={{ background: '#FF2D55' }} />
                        <span className={styles.legendText}>Expert (80-100%)</span>
                    </div>
                    <div className={styles.legendItem}>
                        <div className={styles.legendIndicator} style={{ background: '#FF6B8B' }} />
                        <span className={styles.legendText}>Advanced (60-79%)</span>
                    </div>
                    <div className={styles.legendItem}>
                        <div className={styles.legendIndicator} style={{ background: '#8B5CF6' }} />
                        <span className={styles.legendText}>Intermediate (40-59%)</span>
                    </div>
                    <div className={styles.legendItem}>
                        <div className={styles.legendIndicator} style={{ background: '#A8B9CC' }} />
                        <span className={styles.legendText}>Beginner (0-39%)</span>
                    </div>
                </div>
            </div>

            {/* Floating Tech Icons */}
            <div className={styles.floatingIcons}>
                {['< />', '{ }', '[]', '()', '=>', ';'].map((icon, index) => (
                    <div
                        key={index}
                        className={styles.floatingIcon}
                        style={{ '--float-delay': `${index * 0.5}s` } as React.CSSProperties}
                    >
                        {icon}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;