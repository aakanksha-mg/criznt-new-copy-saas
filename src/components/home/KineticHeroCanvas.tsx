import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  axis: 'x' | 'y';
}

export function KineticHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check reduced motion preference
    const prefersStill = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    let isVisible = true;

    const gridSize = 48; // Grid spacing in px
    const particles: Particle[] = [];
    const maxParticles = 36;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Track mouse on hero container
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', onMouseMove, { passive: true });
      parent.addEventListener('mouseleave', onMouseLeave, { passive: true });
    }

    // Initialize particles flowing along grid lines
    for (let i = 0; i < maxParticles; i++) {
      const axis = Math.random() > 0.5 ? 'x' : 'y';
      const speed = 0.6 + Math.random() * 1.4;
      particles.push({
        x: Math.floor((Math.random() * (width || 1200)) / gridSize) * gridSize,
        y: Math.floor((Math.random() * (height || 800)) / gridSize) * gridSize,
        vx: axis === 'x' ? (Math.random() > 0.5 ? speed : -speed) : 0,
        vy: axis === 'y' ? (Math.random() > 0.5 ? speed : -speed) : 0,
        size: 1.5 + Math.random() * 2,
        alpha: 0.3 + Math.random() * 0.5,
        baseAlpha: 0.2 + Math.random() * 0.5,
        axis,
      });
    }

    // Visibility observer to pause RAF when out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    // Render loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle background perspective / grid lines
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        // Distance from mouse to vertical line
        const distToMouse = Math.abs(x - mouseX);
        const mouseGlow = distToMouse < 200 ? (1 - distToMouse / 200) * 0.25 : 0;
        ctx.strokeStyle = `rgba(0, 170, 255, ${0.035 + mouseGlow})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        const distToMouse = Math.abs(y - mouseY);
        const mouseGlow = distToMouse < 200 ? (1 - distToMouse / 200) * 0.25 : 0;
        ctx.strokeStyle = `rgba(0, 170, 255, ${0.035 + mouseGlow})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw Interactive Cursor Radial Halo
      if (mouseX > 0 && mouseY > 0) {
        const radial = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 280);
        radial.addColorStop(0, 'rgba(0, 204, 255, 0.16)');
        radial.addColorStop(0.5, 'rgba(0, 68, 255, 0.08)');
        radial.addColorStop(1, 'rgba(0, 8, 46, 0)');
        ctx.fillStyle = radial;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 280, 0, Math.PI * 2);
        ctx.fill();
      }

      // If user requested reduced motion, draw once and pause
      if (prefersStill) return;

      // 3. Update & Draw Moving Data Packets (Vectorized Transaction Stream)
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Distance to cursor
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let alpha = p.baseAlpha;
        let radius = p.size;

        if (dist < 180) {
          alpha = Math.min(1, p.baseAlpha + (1 - dist / 180) * 0.7);
          radius = p.size * 1.5;
        }

        // Particle Glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3);
        grad.addColorStop(0, `rgba(0, 204, 255, ${alpha})`);
        grad.addColorStop(0.5, `rgba(0, 136, 255, ${alpha * 0.4})`);
        grad.addColorStop(1, 'rgba(0, 68, 255, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Particle Core
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 0.75, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (parent) {
        parent.removeEventListener('mousemove', onMouseMove);
        parent.removeEventListener('mouseleave', onMouseLeave);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="kinetic-hero-canvas"
      aria-hidden="true"
    />
  );
}
