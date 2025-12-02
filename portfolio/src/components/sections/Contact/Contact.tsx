'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import GlitchText from '../../ui/GlitchText/GlitchText';
import { sendEmail } from '../../../utils/emailService';
import styles from './Contact.module.css';
import { useToast } from '@/components/ui/Toast';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const Contact = () => {
    const { isDark } = useTheme();
    const { showToast } = useToast();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [activeField, setActiveField] = useState<string | null>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);

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

        if (contactRef.current) {
            observer.observe(contactRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Particle animation
    useEffect(() => {
        if (!particlesRef.current || !isVisible) return;

        const container = particlesRef.current;
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = styles.floatingParticle;

            // Random properties
            const size = Math.random() * 4 + 1;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;

            container.appendChild(particle);
        }

        return () => {
            container.innerHTML = '';
        };
    }, [isVisible]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await sendEmail({
                sendername: formData.name,
                sendermail: formData.email,
                subject: formData.subject,
                message: formData.message
            });
            showToast('Success!', 'Your message has been sent successfully.', 'bx-message-square-check', '#0060af');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Contact form error:', error);
            showToast(
                'Error!',
                error instanceof Error ? error.message : 'Failed to send message. Please try again.',
                'bx-message-square-error',
                '#af0000'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: 'bx bx-envelope',
            title: 'Email',
            value: 'neerajkumar.b@example.com',
            color: '#FF2D55',
        },
        {
            icon: 'bx bx-phone',
            title: 'Phone',
            value: '+91 1234567890',
            color: '#2196F3',
        },
        {
            icon: 'bx bx-map',
            title: 'Location',
            value: 'Visakhapatnam, India',
            color: '#9C27B0',
        },
    ];

    return (
        <section
            id="Contact"
            ref={contactRef}
            className={`${styles.contact} ${isVisible ? styles.visible : ''}`}
            data-theme={isDark ? 'dark' : 'light'}
        >
            {/* Animated Background */}
            <div className={styles.contactBackground}>
                <div className={styles.waveContainer}>
                    <div className={styles.wave} />
                    <div className={styles.wave} />
                    <div className={styles.wave} />
                </div>
                <div ref={particlesRef} className={styles.particlesContainer} />
            </div>

            <div className={styles.contactContainer}>
                {/* Section Header */}
                <div className={styles.sectionHeader}>
                    <GlitchText text="Contact Me" className={styles.sectionTitle} />
                    <div className={styles.titleUnderline}>
                        <div className={styles.underlineFill} />
                    </div>
                    <p className={styles.sectionSubtitle}>
                        Let&apos;s connect and discuss opportunities
                    </p>
                </div>

                <div className={styles.contactContent}>
                    {/* Contact Info */}
                    <div className={styles.contactInfo}>
                        <div className={styles.infoCard}>
                            <h3 className={styles.infoTitle}>Get in Touch</h3>
                            <p className={styles.infoDescription}>
                                Feel free to reach out for collaborations, opportunities, or just to say hello!
                            </p>

                            <div className={styles.contactDetails}>
                                {contactInfo.map((info, index) => (
                                    <div
                                        key={index}
                                        className={styles.contactDetail}
                                        style={{ '--info-color': info.color } as React.CSSProperties}
                                    >
                                        <div className={styles.detailIcon}>
                                            <i className={info.icon} />
                                            <div className={styles.iconGlow} />
                                        </div>
                                        <div className={styles.detailContent}>
                                            <h4 className={styles.detailTitle}>{info.title}</h4>
                                            <p className={styles.detailValue}>{info.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className={styles.socialLinks}>
                                <h4 className={styles.socialTitle}>Connect with me</h4>
                                <div className={styles.socialIcons}>
                                    <a
                                        href="https://www.linkedin.com/in/b-neeraj-kumar/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIcon}
                                        aria-label="LinkedIn"
                                    >
                                        <i className="bx bxl-linkedin" />
                                        <div className={styles.socialGlow} />
                                    </a>
                                    <a
                                        href="https://github.com/Joy-Boy-999s"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIcon}
                                        aria-label="GitHub"
                                    >
                                        <i className="bx bxl-github" />
                                        <div className={styles.socialGlow} />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/j.o.y___b.o.y/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIcon}
                                        aria-label="Instagram"
                                    >
                                        <i className="bx bxl-instagram" />
                                        <div className={styles.socialGlow} />
                                    </a>
                                    <a
                                        href="mailto:neerajkumar.b@example.com"
                                        className={styles.socialIcon}
                                        aria-label="Email"
                                    >
                                        <i className="bx bx-envelope" />
                                        <div className={styles.socialGlow} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className={styles.contactForm}>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            {/* Name Field */}
                            <div
                                className={`${styles.formGroup} ${activeField === 'name' || formData.name ? styles.active : ''}`}
                                onFocus={() => setActiveField('name')}
                                onBlur={() => setActiveField(null)}
                            >
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    required
                                    disabled={isLoading}
                                />
                                <label htmlFor="name" className={styles.formLabel}>
                                    <span className={styles.labelText}>Your Name</span>
                                    <div className={styles.labelLine} />
                                </label>
                                <div className={styles.fieldGlow} />
                                <div className={styles.fieldParticles}>
                                    {[...Array(6)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={styles.fieldParticle}
                                            style={{ '--particle-index': i } as React.CSSProperties}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Email Field */}
                            <div
                                className={`${styles.formGroup} ${activeField === 'email' || formData.email ? styles.active : ''}`}
                                onFocus={() => setActiveField('email')}
                                onBlur={() => setActiveField(null)}
                            >
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    required
                                    disabled={isLoading}
                                />
                                <label htmlFor="email" className={styles.formLabel}>
                                    <span className={styles.labelText}>Your Email</span>
                                    <div className={styles.labelLine} />
                                </label>
                                <div className={styles.fieldGlow} />
                                <div className={styles.fieldParticles}>
                                    {[...Array(6)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={styles.fieldParticle}
                                            style={{ '--particle-index': i } as React.CSSProperties}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Subject Field */}
                            <div
                                className={`${styles.formGroup} ${activeField === 'subject' || formData.subject ? styles.active : ''}`}
                                onFocus={() => setActiveField('subject')}
                                onBlur={() => setActiveField(null)}
                            >
                                <input
                                    type="text"
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    required
                                    disabled={isLoading}
                                />
                                <label htmlFor="subject" className={styles.formLabel}>
                                    <span className={styles.labelText}>Subject</span>
                                    <div className={styles.labelLine} />
                                </label>
                                <div className={styles.fieldGlow} />
                                <div className={styles.fieldParticles}>
                                    {[...Array(6)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={styles.fieldParticle}
                                            style={{ '--particle-index': i } as React.CSSProperties}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Message Field */}
                            <div
                                className={`${styles.formGroup} ${styles.textareaGroup} ${activeField === 'message' || formData.message ? styles.active : ''}`}
                                onFocus={() => setActiveField('message')}
                                onBlur={() => setActiveField(null)}
                            >
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className={styles.formTextarea}
                                    rows={5}
                                    required
                                    disabled={isLoading}
                                />
                                <label htmlFor="message" className={styles.formLabel}>
                                    <span className={styles.labelText}>Your Message</span>
                                    <div className={styles.labelLine} />
                                </label>
                                <div className={styles.fieldGlow} />
                                <div className={styles.fieldParticles}>
                                    {[...Array(6)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={styles.fieldParticle}
                                            style={{ '--particle-index': i } as React.CSSProperties}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isLoading}
                                aria-label={isLoading ? 'Sending message...' : 'Send message'}
                            >
                                <span className={styles.buttonText}>
                                    {isLoading ? (
                                        <>
                                            <i className="bx bx-loader-alt bx-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <i className="bx bx-send" />
                                        </>
                                    )}
                                </span>
                                <div className={styles.buttonGlow} />
                                <div className={styles.buttonRipple} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Contact Status */}
                <div className={styles.contactStatus}>
                    <div className={styles.statusCard}>
                        <div className={styles.statusIcon}>
                            <i className="bx bx-check-circle" />
                        </div>
                        <div className={styles.statusContent}>
                            <h4 className={styles.statusTitle}>Response Time</h4>
                            <p className={styles.statusText}>I typically respond within 24 hours</p>
                    </div>
                </div>
                <div className={styles.statusCard}>
                    <div className={styles.statusIcon}>
                        <i className="bx bx-time" />
                    </div>
                    <div className={styles.statusContent}>
                    <h4 className={styles.statusTitle}>Availability</h4>
                    <p className={styles.statusText}>Available for freelance opportunities</p>
            </div>
        </div>
        </div >
      </div >

    {/* Floating Elements */ }
    < div className = { styles.floatingElements } >
        <div className={styles.floatingShape} />
        <div className={styles.floatingShape} />
        <div className={styles.floatingShape} />
      </div >
    </section >
  );
};

export default Contact;