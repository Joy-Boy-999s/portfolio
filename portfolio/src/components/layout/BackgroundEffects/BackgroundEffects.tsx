'use client';

import { useEffect, useState, useRef } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import styles from './BackgroundEffects.module.css';

const BackgroundEffects = () => {
  const { isDark } = useTheme();
  const [squares, setSquares] = useState<number[]>([]);
  const [columns, setColumns] = useState(20);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  // Grid squares calculation
  useEffect(() => {
    const calculateSquares = () => {
      const colres = Math.max(10, Math.floor(window.innerWidth / 50));
      const rowres = Math.max(5, Math.floor(window.innerHeight / 50));
      const numsq = colres * rowres;
      setColumns(colres);
      setSquares(Array.from({ length: numsq }));
    };

    calculateSquares();
    window.addEventListener('resize', calculateSquares);
    return () => window.removeEventListener('resize', calculateSquares);
  }, []);

  // Canvas particle animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
    }> = [];

    // Initialize particles
    const initParticles = () => {
      particles.length = 0;
      const particleCount = Math.min(100, Math.floor(window.innerWidth * window.innerHeight / 10000));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: isDark 
            ? `rgba(255, 45, 85, ${Math.random() * 0.3 + 0.1})`
            : `rgba(255, 107, 139, ${Math.random() * 0.2 + 0.05})`,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };

    initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.speedX *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.speedY *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
      });

      // Reset alpha
      ctx.globalAlpha = 1;

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = isDark 
              ? `rgba(255, 45, 85, ${0.1 * (1 - distance / 100)})`
              : `rgba(255, 107, 139, ${0.05 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDark]);

  return (
    <div className={styles.backgroundContainer}>
      {/* Gradient Background */}
      <div className={`${styles.gradientBackground} ${isDark ? styles.dark : styles.light}`} />
      
      {/* Animated Grid */}
      <div 
        ref={containerRef}
        className={styles.gridContainer}
        style={{ '--columns': columns } as React.CSSProperties}
      >
        {squares.map((_, index) => (
          <div 
            key={index}
            className={styles.gridSquare}
            data-theme={isDark ? 'dark' : 'light'}
          />
        ))}
      </div>
      
      {/* Canvas Particle System */}
      <canvas
        ref={canvasRef}
        className={styles.particleCanvas}
      />
      
      {/* Floating Orbs */}
      <div className={styles.floatingOrbs}>
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
      </div>
    </div>
  );
};

export default BackgroundEffects;