import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ElectricityEffectProps {
  x: number;
  y: number;
  radius: number;
  color?: string;
}

const ElectricityEffect: React.FC<ElectricityEffectProps> = ({
  x,
  y,
  radius,
  color = '#fbbf24', // Default to yellow
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = radius * 4;
    canvas.height = radius * 4;

    // Animation variables
    let time = 0;
    const segments = 8;
    const amplitude = radius * 0.3;
    const frequency = 0.05;

    const drawElectricity = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw multiple lightning bolts
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.6;

        // Start from center
        ctx.moveTo(canvas.width / 2, canvas.height / 2);

        // Create jagged path
        for (let j = 0; j < segments; j++) {
          const angle = (j / segments) * Math.PI * 2;
          const distance = radius + Math.sin(time + i * 2) * amplitude;
          const x = canvas.width / 2 + Math.cos(angle) * distance;
          const y = canvas.height / 2 + Math.sin(angle) * distance;
          ctx.lineTo(x, y);
        }

        // Close the path
        ctx.closePath();
        ctx.stroke();
      }

      // Update time
      time += frequency;
      animationRef.current = requestAnimationFrame(drawElectricity);
    };

    // Start animation
    drawElectricity();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [radius, color]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute',
        left: x - radius * 2,
        top: y - radius * 2,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <canvas ref={canvasRef} />
    </motion.div>
  );
};

export default ElectricityEffect;
