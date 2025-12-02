'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './SkillCircle.module.css';

interface SkillCircleProps {
    id: string;
    percentage: number;
    name: string;
    color: string;
    size?: number;
    strokeWidth?: number;
}

const SkillCircle = ({
    id,
    percentage,
    name,
    color,
    size = 150,
    strokeWidth = 10
}: SkillCircleProps) => {
    const [animatedPercentage, setAnimatedPercentage] = useState(0);
    const circleRef = useRef<SVGCircleElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (percentage === 0) {
            setAnimatedPercentage(0);
            return;
        }

        let start = 0;
        const duration = 1500;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * percentage);

            setAnimatedPercentage(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }, [percentage]);

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

    return (
        <div className={styles.skillCircle}>
            <div className={styles.circleContainer}>
                {/* SVG Circle */}
                <svg
                    width={size}
                    height={size}
                    className={styles.circleSvg}
                >
                    {/* Background Circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        stroke="var(--tertiary-bg)"
                        fill="none"
                        className={styles.circleBackground}
                    />

                    {/* Progress Circle */}
                    <circle
                        ref={circleRef}
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        stroke={color}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className={styles.circleProgress}
                        transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    />

                    {/* Glow Effect */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        stroke={color}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className={styles.circleGlow}
                        transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    />
                </svg>

                {/* Percentage Text */}
                <div ref={textRef} className={styles.percentageText}>
                    <span className={styles.percentageNumber}>{animatedPercentage}</span>
                    <span className={styles.percentageSymbol}>%</span>
                </div>

                {/* Center Glow */}
                <div
                    className={styles.centerGlow}
                    style={{ '--glow-color': color } as React.CSSProperties}
                />
            </div>

            {/* Skill Name */}
            <div className={styles.skillName}>
                <span className={styles.nameText}>{name}</span>
                <div className={styles.nameUnderline} />
            </div>

            {/* Floating Dots */}
            <div className={styles.floatingDots}>
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className={styles.floatingDot}
                        style={{
                            '--dot-index': i,
                            '--dot-color': color,
                        } as React.CSSProperties}
                    />
                ))}
            </div>
        </div>
    );
};

export default SkillCircle;