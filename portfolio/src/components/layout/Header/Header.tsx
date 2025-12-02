'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

const Header = () => {
    const { isDark } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('Home');
    const [isScrolled, setIsScrolled] = useState(false);
    const [headerOpacity, setHeaderOpacity] = useState(1);
    const headerRef = useRef<HTMLElement>(null);
    const lastScrollRef = useRef(0);

    const navItems = [
        { id: 'Home', label: 'Home', href: '#Home' },
        { id: 'Skills', label: 'Skills', href: '#Skills' },
        { id: 'Achievements', label: 'Achievements', href: '#Achievements' },
        { id: 'Projects', label: 'Links', href: '#Projects' },
        { id: 'Contact', label: 'Contact Me', href: '#Contact' },
    ];

    // Scroll effect for header
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            // Header background on scroll
            setIsScrolled(currentScroll > 50);

            // Header opacity on scroll
            const opacity = Math.max(0.8, 1 - (currentScroll / 200));
            setHeaderOpacity(opacity);

            // Active section detection
            const offset = window.innerHeight / 3;
            const sections = navItems.map(item => {
                const element = document.getElementById(item.id);
                if (!element) return null;

                const rect = element.getBoundingClientRect();

                return {
                    id: item.id,
                    top: rect.top,
                    bottom: rect.bottom,
                    height: rect.height,
                };
            }).filter(Boolean);

            sections.forEach(section => {
                if (section && section.top <= offset && section.bottom >= offset) {
                    setActiveSection(section.id);
                }
            });

            lastScrollRef.current = currentScroll;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [navItems]);

    const handleNavClick = (href: string, id: string) => {
        setIsMenuOpen(false);
        setActiveSection(id);

        const element = document.querySelector(href);
        if (element) {
            const headerHeight = headerRef.current?.offsetHeight || 0;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <header
            ref={headerRef}
            className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isMenuOpen ? styles.menuOpen : ''}`}
            style={{ '--header-opacity': headerOpacity } as React.CSSProperties}
            data-theme={isDark ? 'dark' : 'light'}
        >
            <div className={styles.headerContainer}>
                {/* Logo */}
                <div
                    className={styles.logo}
                    onClick={() => handleNavClick('#Home', 'Home')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleNavClick('#Home', 'Home')}
                >
                    <span className={styles.logoText}>B.Neeraj Kumar</span>
                    <span className={styles.logoUnderline} />
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={styles.menuToggle}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
                >
                    <div className={`${styles.menuIcon} ${isMenuOpen ? styles.open : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>

                {/* Navigation */}
                <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
                    <ul className={styles.navList}>
                        {navItems.map((item, index) => (
                            <li
                                key={item.id}
                                className={styles.navItem}
                                style={{ '--item-index': index } as React.CSSProperties}
                            >
                                <a
                                    className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                                    onClick={() => handleNavClick(item.href, item.id)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && handleNavClick(item.href, item.id)}
                                >
                                    <span className={styles.linkText}>{item.label}</span>
                                    <span className={styles.linkUnderline} />
                                    <span className={styles.linkHighlight} />
                                </a>
                            </li>
                        ))}

                        {/* Theme Toggle in Navigation */}
                        <li className={styles.navItem}>
                            <ThemeToggle />
                        </li>
                    </ul>
                </nav>

                {/* Desktop Theme Toggle */}
                <div className={styles.desktopThemeToggle}>
                    <ThemeToggle />
                </div>
            </div>

            {/* Mobile Menu Backdrop */}
            {isMenuOpen && (
                <div
                    className={styles.menuBackdrop}
                    onClick={() => setIsMenuOpen(false)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setIsMenuOpen(false)}
                    aria-label="Close menu"
                />
            )}
        </header>
    );
};

export default Header;