import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ElectricityEffectProps {
  x: number;
  y: number;
  radius: number;
  color?: string;
  intensity?: 'low' | 'medium' | 'high';
  variation?: 'standard' | 'pulse' | 'spiral';
}

const ElectricityEffect: React.FC<ElectricityEffectProps> = ({
  x,
  y,
  radius,
  color = '#fbbf24',
  intensity = 'medium',
  variation = 'standard',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Animation parameters based on intensity
  const getIntensityParams = () => {
    switch (intensity) {
      case 'low':
        return {
          segments: 6,
          amplitude: radius * 0.2,
          frequency: 0.03,
          bolts: 2,
          opacity: 0.4,
        };
      case 'high':
        return {
          segments: 12,
          amplitude: radius * 0.4,
          frequency: 0.08,
          bolts: 4,
          opacity: 0.8,
        };
      default: // medium
        return {
          segments: 8,
          amplitude: radius * 0.3,
          frequency: 0.05,
          bolts: 3,
          opacity: 0.6,
        };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = radius * 4;
    canvas.height = radius * 4;

    // Get animation parameters
    const { segments, amplitude, frequency, bolts, opacity } = getIntensityParams();

    // Animation variables
    let time = 0;
    let rotation = 0;

    const drawElectricity = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw multiple lightning bolts
      for (let i = 0; i < bolts; i++) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = opacity;

        // Start from center
        ctx.moveTo(canvas.width / 2, canvas.height / 2);

        // Create path based on variation
        switch (variation) {
          case 'spiral':
            for (let j = 0; j < segments; j++) {
              const angle = (j / segments) * Math.PI * 4 + rotation;
              const distance = radius * (1 + j / segments) + Math.sin(time + i * 2) * amplitude;
              const x = canvas.width / 2 + Math.cos(angle) * distance;
              const y = canvas.height / 2 + Math.sin(angle) * distance;
              ctx.lineTo(x, y);
            }
            break;

          case 'pulse':
            for (let j = 0; j < segments; j++) {
              const angle = (j / segments) * Math.PI * 2;
              const pulse = Math.sin(time * 2 + i) * amplitude;
              const distance = radius + pulse;
              const x = canvas.width / 2 + Math.cos(angle) * distance;
              const y = canvas.height / 2 + Math.sin(angle) * distance;
              ctx.lineTo(x, y);
            }
            break;

          default: // standard
            for (let j = 0; j < segments; j++) {
              const angle = (j / segments) * Math.PI * 2;
              const distance = radius + Math.sin(time + i * 2) * amplitude;
              const x = canvas.width / 2 + Math.cos(angle) * distance;
              const y = canvas.height / 2 + Math.sin(angle) * distance;
              ctx.lineTo(x, y);
            }
        }

        // Close the path
        ctx.closePath();
        ctx.stroke();

        // Add glow effect
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Update time and rotation
      time += frequency;
      rotation += 0.01;
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
  }, [radius, color, intensity, variation]);

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
