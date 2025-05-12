import React, { useEffect, useRef } from 'react';

const NUM_PARTICLES = 64;

const GlobalGlassParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId: number;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    ctx?.scale(dpr, dpr);

    // Generate particles
    const particles = Array.from({ length: NUM_PARTICLES }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 2.5 + Math.random() * 2.5,
      speed: 0.1 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Glass morphism gradient overlay
      const glassGradient = ctx.createLinearGradient(0, 0, window.innerWidth, window.innerHeight);
      glassGradient.addColorStop(0, 'rgba(255,255,255,0.10)');
      glassGradient.addColorStop(1, 'rgba(255,255,255,0.04)');
      ctx.fillStyle = glassGradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw particles
      particles.forEach(p => {
        const y = p.y + Math.sin(Date.now() * 0.0005 + p.phase) * 8;
        ctx.beginPath();
        ctx.arc(p.x, y, p.r, 0, Math.PI * 2);
        const dotGradient = ctx.createRadialGradient(p.x, y, 0, p.x, y, p.r * 2.5);
        dotGradient.addColorStop(0, 'rgba(255,255,255,0.95)');
        dotGradient.addColorStop(1, 'rgba(255,255,255,0.15)');
        ctx.fillStyle = dotGradient;
        ctx.shadowColor = 'rgba(255,255,255,0.7)';
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      animationId = requestAnimationFrame(draw);
    }

    function handleResize() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      ctx.scale(dpr, dpr);
    }

    window.addEventListener('resize', handleResize);
    draw();
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none select-none">
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-2xl" />
      {/* Subtle radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.10),transparent_70%)]" />
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />
    </div>
  );
};

export default GlobalGlassParticles; 