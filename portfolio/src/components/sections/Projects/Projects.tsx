'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import GlitchText from '../../ui/GlitchText/GlitchText';
import styles from './Projects.module.css';

const Projects = () => {
    const { isDark } = useTheme();
    const [activeFilter, setActiveFilter] = useState('all');
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const projectsRef = useRef<HTMLDivElement>(null);

    const filters = [
        { id: 'all', label: 'All Links', count: 3 },
        { id: 'social', label: 'Social', count: 2 },
        { id: 'professional', label: 'Professional', count: 1 },
    ];

    const projects = [
        {
            id: 'instagram',
            title: 'Instagram',
            description: 'Follow my creative journey and daily updates',
            category: 'social',
            url: 'https://www.instagram.com/j.o.y___b.o.y/',
            image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=800',
            icon: 'bx bxl-instagram-alt',
            color: '#E4405F',
            stats: { followers: '1.2K+', posts: '150+' },
        },
        {
            id: 'linkedin',
            title: 'LinkedIn',
            description: 'Connect professionally and view my career journey',
            category: 'professional',
            url: 'https://www.linkedin.com/in/b-neeraj-kumar/',
            image: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?auto=format&fit=crop&w=800',
            icon: 'bx bxl-linkedin-square',
            color: '#0A66C2',
            stats: { connections: '500+', endorsements: '50+' },
        },
        {
            id: 'github',
            title: 'GitHub',
            description: 'Explore my code repositories and projects',
            category: 'professional',
            url: 'https://github.com/Joy-Boy-999s',
            image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800',
            icon: 'bx bxl-github',
            color: '#181717',
            stats: { repositories: '20+', contributions: '150+' },
        },
    ];

    const filteredProjects = projects.filter(
        project => activeFilter === 'all' || project.category === activeFilter
    );

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

        if (projectsRef.current) {
            observer.observe(projectsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Mouse move effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!projectsRef.current) return;

            const rect = projectsRef.current.getBoundingClientRect();
            setMousePosition({
                x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
                y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleProjectClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <section
            id="Projects"
            ref={projectsRef}
            className={`${styles.projects} ${isVisible ? styles.visible : ''}`}
            data-theme={isDark ? 'dark' : 'light'}
            style={{
                '--mouse-x': mousePosition.x,
                '--mouse-y': mousePosition.y,
            } as React.CSSProperties}
        >
            {/* Animated Background */}
            <div className={styles.animatedBackground}>
                <div className={styles.gridPattern} />
                <div className={styles.floatingConnections}>
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className={styles.connectionLine}
                            style={{ '--line-index': i } as React.CSSProperties}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.projectsContainer}>
                {/* Section Header */}
                <div className={styles.sectionHeader}>
                    <GlitchText text="My Links" className={styles.sectionTitle} />
                    <div className={styles.titleUnderline}>
                        <div className={styles.underlineFill} />
                    </div>
                    <p className={styles.sectionSubtitle}>
                        Connect with me across different platforms
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className={styles.filterButtons}>
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            className={`${styles.filterButton} ${activeFilter === filter.id ? styles.active : ''}`}
                            onClick={() => setActiveFilter(filter.id)}
                            aria-label={`Filter by ${filter.label}`}
                            aria-pressed={activeFilter === filter.id}
                        >
                            <span className={styles.filterLabel}>{filter.label}</span>
                            <span className={styles.filterCount}>{filter.count}</span>
                            <div className={styles.filterIndicator} />
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className={styles.projectsGrid}>
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className={styles.projectCard}
                            style={{
                                '--project-color': project.color,
                                '--card-index': index,
                            } as React.CSSProperties}
                            onClick={() => handleProjectClick(project.url)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && handleProjectClick(project.url)}
                        >
                            {/* Card Background */}
                            <div className={styles.cardBackground}>
                                <div className={styles.cardGradient} />
                                <div
                                    className={styles.cardImage}
                                    style={{ backgroundImage: `url(${project.image})` }}
                                />
                                <div className={styles.cardOverlay} />
                            </div>

                            {/* Card Content */}
                            <div className={styles.cardContent}>
                                {/* Platform Icon */}
                                <div className={styles.platformIcon}>
                                    <div className={styles.iconBackground} />
                                    <i className={`${project.icon} ${styles.icon}`} />
                                    <div className={styles.iconGlow} />
                                </div>

                                {/* Project Info */}
                                <div className={styles.projectInfo}>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <p className={styles.projectDescription}>{project.description}</p>

                                    {/* Stats */}
                                    <div className={styles.projectStats}>
                                        {Object.entries(project.stats).map(([key, value]) => (
                                            <div key={key} className={styles.statItem}>
                                                <span className={styles.statValue}>{value}</span>
                                                <span className={styles.statLabel}>
                                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className={styles.actionButton}>
                                    <span className={styles.buttonText}>Visit</span>
                                    <i className="bx bx-arrow-to-right" />
                                    <div className={styles.buttonGlow} />
                                </div>
                            </div>

                            {/* Hover Effects */}
                            <div className={styles.hoverEffects}>
                                <div className={styles.hoverGlow} />
                                <div className={styles.hoverParticles}>
                                    {[...Array(8)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={styles.particle}
                                            style={{ '--particle-index': i } as React.CSSProperties}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Card Border */}
                            <div className={styles.cardBorder}>
                                <div className={styles.borderTop} />
                                <div className={styles.borderRight} />
                                <div className={styles.borderBottom} />
                                <div className={styles.borderLeft} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className={styles.viewAllContainer}>
                    <button
                        className={styles.viewAllButton}
                        onClick={() => setActiveFilter('all')}
                        aria-label="View all links"
                    >
                        <span className={styles.viewAllText}>View All Platforms</span>
                        <div className={styles.viewAllIcon}>
                            <i className="bx bx-chevron-right" />
                            <i className="bx bx-chevron-right" />
                        </div>
                        <div className={styles.viewAllGlow} />
                    </button>
                </div>

                {/* Social Stats */}
                <div className={styles.socialStats}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <i className="bx bx-user-plus" />
                        </div>
                        <div className={styles.statContent}>
                            <h4 className={styles.statNumber}>2K+</h4>
                            <p className={styles.statLabel}>Total Connections</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <i className="bx bx-share-alt" />
                        </div>
                        <div className={styles.statContent}>
                            <h4 className={styles.statNumber}>50+</h4>
                            <p className={styles.statLabel}>Projects Shared</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <i className="bx bx-like" />
                        </div>
                        <div className={styles.statContent}>
                            <h4 className={styles.statNumber}>500+</h4>
                            <p className={styles.statLabel}>Total Engagements</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Social Icons */}
            <div className={styles.floatingSocialIcons}>
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className={styles.floatingIcon}
                        style={{ '--icon-color': project.color } as React.CSSProperties}
                        onClick={() => handleProjectClick(project.url)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && handleProjectClick(project.url)}
                    >
                        <i className={project.icon} />
                        <div className={styles.iconTooltip}>{project.title}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;