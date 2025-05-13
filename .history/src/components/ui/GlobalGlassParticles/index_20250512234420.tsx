'use client';
import React, { useEffect, useRef, useState } from 'react';

const NUM_PARTICLES = 64;

interface HeroGlassParticlesProps {
  enabled?: boolean;
}

const HeroGlassParticles: React.FC<HeroGlassParticlesProps> = ({ enabled = true }) => {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!enabled || !mounted) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    let animationId: number;
    let width = container.offsetWidth;
    let height = container.offsetHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx?.scale(dpr, dpr);

    // Detect theme
    const isDark = document.documentElement.classList.contains('dark');

    // Generate particles
    const particles = Array.from({ length: NUM_PARTICLES }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 2.5 + Math.random() * 2.5,
      speed: 0.1 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Glass morphism gradient overlay
      const glassGradient = ctx.createLinearGradient(0, 0, width, height);
      glassGradient.addColorStop(0, 'rgba(255,255,255,0.05)');
      glassGradient.addColorStop(1, 'rgba(255,255,255,0.02)');
      ctx.fillStyle = glassGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw particles
      particles.forEach(p => {
        const y = p.y + Math.sin(Date.now() * 0.0005 + p.phase) * 8;
        ctx.beginPath();
        ctx.arc(p.x, y, p.r, 0, Math.PI * 2);
        const dotGradient = ctx.createRadialGradient(p.x, y, 0, p.x, y, p.r * 2.5);
        if (isDark) {
          // Bright white center, soft fade, blueish glow
          dotGradient.addColorStop(0, 'rgba(255,255,255,0.95)');
          dotGradient.addColorStop(1, 'rgba(255,255,255,0.10)');
          ctx.fillStyle = dotGradient;
          ctx.shadowColor = 'rgba(120,180,255,0.5)'; // blue glow
          ctx.shadowBlur = 16;
        } else {
          // Blue/gray center, soft fade, dark glow for visibility on white
          dotGradient.addColorStop(0, 'rgba(96,165,250,0.85)'); // blue-400
          dotGradient.addColorStop(0.5, 'rgba(148,163,184,0.25)'); // slate-400
          dotGradient.addColorStop(1, 'rgba(255,255,255,0.10)');
          ctx.fillStyle = dotGradient;
          ctx.shadowColor = 'rgba(30,41,59,0.25)'; // slate-800
          ctx.shadowBlur = 14;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      animationId = requestAnimationFrame(draw);
    }

    function resizeCanvas() {
      if (!container || !canvas) return;
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx?.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx?.scale(dpr, dpr);
    }

    const resizeObserver = new window.ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);
    draw();
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [enabled, mounted]);

  if (!enabled || !mounted) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none"
    >
      {/* Glass morphism overlay - more transparent */}
      <div className="absolute inset-0 bg-white/5 dark:bg-white/2" />
      {/* Subtle radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.07),transparent_70%)]" />
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />
    </div>
  );
};

export default HeroGlassParticles;
