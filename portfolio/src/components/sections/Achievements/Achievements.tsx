'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import GlitchText from '../../ui/GlitchText/GlitchText';
import styles from './Achievements.module.css';

const Achievements = () => {
    const { isDark } = useTheme();
    const [activeCategory, setActiveCategory] = useState('education');
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const achievementsRef = useRef<HTMLDivElement>(null);

    const categories = [
        { id: 'education', label: 'Education', icon: 'bx bxs-graduation' },
        { id: 'internships', label: 'Internships', icon: 'bx bxs-briefcase' },
        { id: 'certifications', label: 'Certifications', icon: 'bx bxs-award' },
        { id: 'projects', label: 'Projects', icon: 'bx bxs-cube' },
    ];

    type AchievementItem = {
        title: string;
        period: string;
        details: string[];
        tags: string[];
        institution?: string;
    };

    type AchievementCategory = 'education' | 'internships' | 'certifications' | 'projects';

    const achievements: Record<AchievementCategory, AchievementItem[]> = {
        education: [
            {
                title: 'Bachelor of Technology in Electronics and Communication Engineering',
                institution: 'Andhra University College of Engineering, India',
                period: '2020-2024',
                details: [
                    'Relevant Coursework: Microprocessors, PLCs, Industrial Automation, and Communication Systems',
                    'CGPA: 7.48/10.0',
                ],
                tags: ['Engineering', 'Electronics', 'Automation'],
            },
            {
                title: 'Intermediate Education',
                institution: 'Narayana Junior College, Andhra Pradesh, India',
                period: '2018-2020',
                details: ['CGPA: 8.89/10.0'],
                tags: ['Science', 'Mathematics'],
            },
            {
                title: 'Secondary Education',
                institution: 'MP & EV English Medium School, Visakhapatnam, India',
                period: '2017-2018',
                details: ['Percentage: 60%'],
                tags: ['Schooling'],
            },
        ],
        internships: [
            {
                title: 'Intern at Strugger Innovations, India',
                period: '2024/06–2024/07',
                details: [
                    'Gained hands-on experience in Siemens and Allen Bradley PLCs',
                    'Designed and configured SCADA systems and HMI interfaces for real-world industrial applications',
                ],
                tags: ['PLC', 'SCADA', 'Industrial Automation'],
            },
            {
                title: 'Project Intern at RINL Visakhapatnam, India',
                period: '2023.06–2023.07',
                details: [
                    'Studied and analyzed the application of microprocessors and PLCs in industrial environments',
                    'Focused on automation systems',
                ],
                tags: ['Microprocessors', 'Industrial Systems'],
            },
        ],
        certifications: [
            {
                title: 'MERN Stack Development Course',
                institution: 'NxtWave',
                period: '2024.02–Ongoing',
                details: ['Currently enrolled in a comprehensive MERN stack course to enhance full-stack web development skills'],
                tags: ['Web Development', 'MERN'],
            },
            {
                title: 'PLC and SCADA Training Certification',
                institution: 'Strugger Innovations',
                period: '2024',
                details: ['Received specialized training in automation technologies, focusing on Siemens and Allen Bradley PLCs'],
                tags: ['PLC', 'SCADA', 'Training'],
            },
            {
                title: 'Class Representative',
                institution: 'Andhra University College of Engineering',
                period: '2020–2024',
                details: ['Elected as Class Representative for 5 semesters, demonstrating leadership and communication skills'],
                tags: ['Leadership', 'Management'],
            },
            {
                title: 'Volunteer at Job Mela',
                institution: 'Andhra Pradesh Government',
                period: '2023',
                details: ['Assisted in organizing and managing the Job Mela event, contributing to its success'],
                tags: ['Volunteering', 'Event Management'],
            },
        ],
        projects: [
            {
                title: 'IoT Project on Arduino Uno with LDR Sensor',
                period: '2024',
                details: [
                    'Developed an automated lighting system using an Arduino Uno and LDR sensor to adjust lighting based on ambient light levels',
                    'Enhanced energy efficiency by automating lighting control, contributing to smart home automation',
                ],
                tags: ['IoT', 'Arduino', 'Automation', 'Energy Efficiency'],
            },
            {
                title: 'Fake Currency Detection Using Machine Learning',
                period: '2023',
                details: [
                    'Designed a counterfeit detection system using image processing and machine learning algorithms, achieving high accuracy in identifying fake currency notes',
                    'Implemented advanced data processing techniques for precise detection and validation',
                ],
                tags: ['Machine Learning', 'Image Processing', 'Security'],
            },
        ],
    };

    // Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.2, rootMargin: '50px' }
        );

        if (achievementsRef.current) {
            observer.observe(achievementsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Scroll progress for timeline
    useEffect(() => {
        const handleScroll = () => {
            if (!achievementsRef.current) return;

            const rect = achievementsRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 2)));
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            id="Achievements"
            ref={achievementsRef}
            className={`${styles.achievements} ${isVisible ? styles.visible : ''}`}
            data-theme={isDark ? 'dark' : 'light'}
        >
            {/* Background Timeline */}
            <div className={styles.timelineBackground}>
                <div
                    className={styles.timelineProgress}
                    style={{ height: `${scrollProgress * 100}%` }}
                />
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className={styles.timelineDot}
                        style={{ top: `${i * 5}%` }}
                    />
                ))}
            </div>

            <div className={styles.achievementsContainer}>
                {/* Section Header */}
                <div className={styles.sectionHeader}>
                    <GlitchText text="Achievements" className={styles.sectionTitle} />
                    <p className={styles.sectionSubtitle}>
                        My academic journey, professional experience, and accomplishments
                    </p>
                </div>

                {/* Category Navigation */}
                <div className={styles.categoryNav}>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
                            onClick={() => setActiveCategory(category.id)}
                            aria-label={`Show ${category.label} achievements`}
                            aria-current={activeCategory === category.id}
                        >
                            <i className={category.icon} />
                            <span className={styles.categoryLabel}>{category.label}</span>
                            <div className={styles.categoryIndicator} />
                        </button>
                    ))}
                </div>

                {/* Achievements Content */}
                <div className={styles.achievementsContent}>
                    <div className={styles.timelineContainer}>
                        {/* Timeline Line */}
                        <div className={styles.timelineLine}>
                            <div className={styles.timelineLineInner} />
                        </div>

                        {/* Timeline Items */}
                        <div className={styles.timelineItems}>
                            {achievements[activeCategory as keyof typeof achievements]?.map((item, index) => (
                                <div
                                    key={index}
                                    className={styles.timelineItem}
                                    style={{ '--item-index': index } as React.CSSProperties}
                                >
                                    {/* Timeline Marker */}
                                    <div className={styles.timelineMarker}>
                                        <div className={styles.markerOuter} />
                                        <div className={styles.markerInner}>
                                            <i className={categories.find(c => c.id === activeCategory)?.icon} />
                                        </div>
                                        <div className={styles.markerGlow} />
                                    </div>

                                    {/* Achievement Card */}
                                    <div className={styles.achievementCard}>
                                        <div className={styles.cardHeader}>
                                            <h3 className={styles.achievementTitle}>{item.title}</h3>
                                            <div className={styles.achievementMeta}>
                                                {item.institution && (
                                                    <span className={styles.institution}>
                                                        <i className="bx bx-building" />
                                                        {item.institution}
                                                    </span>
                                                )}
                                                <span className={styles.period}>
                                                    <i className="bx bx-calendar" />
                                                    {item.period}
                                                </span>
                                            </div>
                                        </div>

                                        <div className={styles.cardContent}>
                                            <ul className={styles.achievementDetails}>
                                                {item.details.map((detail, i) => (
                                                    <li key={i} className={styles.detailItem}>
                                                        <div className={styles.detailMarker} />
                                                        <span className={styles.detailText}>{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {item.tags && item.tags.length > 0 && (
                                                <div className={styles.achievementTags}>
                                                    {item.tags.map((tag, i) => (
                                                        <span key={i} className={styles.tag}>
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Card Effects */}
                                        <div className={styles.cardGlow} />
                                        <div className={styles.cardShine} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Achievement Stats */}
                    <div className={styles.achievementStats}>
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                                <i className="bx bxs-graduation" />
                                <div className={styles.statIconGlow} />
                            </div>
                            <div className={styles.statContent}>
                                <h4 className={styles.statNumber}>3+</h4>
                                <p className={styles.statLabel}>Academic Programs</p>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                                <i className="bx bxs-briefcase" />
                                <div className={styles.statIconGlow} />
                            </div>
                            <div className={styles.statContent}>
                                <h4 className={styles.statNumber}>2</h4>
                                <p className={styles.statLabel}>Internships</p>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                                <i className="bx bxs-award" />
                                <div className={styles.statIconGlow} />
                            </div>
                            <div className={styles.statContent}>
                                <h4 className={styles.statNumber}>4</h4>
                                <p className={styles.statLabel}>Certifications</p>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                                <i className="bx bxs-cube" />
                                <div className={styles.statIconGlow} />
                            </div>
                            <div className={styles.statContent}>
                                <h4 className={styles.statNumber}>2</h4>
                                <p className={styles.statLabel}>Projects</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Decorations */}
                <div className={styles.floatingDecorations}>
                    <div className={styles.floatingShape} />
                    <div className={styles.floatingShape} />
                    <div className={styles.floatingShape} />
                </div>
            </div>
        </section>
    );
};

export default Achievements;