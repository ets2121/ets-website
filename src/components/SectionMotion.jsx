import React, { useRef, useEffect } from 'react';

const SectionMotion = ({ type = 'hexes', opacity = 0.3 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, animationFrameId;
    let isVisible = true;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    const maxDPR = isMobile ? 1.5 : 2.0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          animate();
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.1 }
    );

    const resize = () => {
      const container = canvas.parentElement;
      width = container.offsetWidth;
      height = container.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDPR);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const drawHex = (x, y, size, alpha) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + size * Math.cos(angle);
        const hy = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0, 242, 255, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    let particles = [];
    const initParticles = () => {
      particles = [];
      let count = type === 'hexes' ? 15 : 40;
      if (isMobile) count = Math.floor(count * 0.6);

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: type === 'hexes' ? Math.random() * 40 + 20 : Math.random() * 3 + 1,
          speed: Math.random() * 0.4 + 0.1,
          angle: Math.random() * Math.PI * 2,
          opacity: Math.random() * 0.5 + 0.1,
          rotSpeed: (Math.random() - 0.5) * 0.02
        });
      }
    };

    const animate = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y -= p.speed;
        p.angle += p.rotSpeed;
        if (p.y < -p.size * 2) p.y = height + p.size * 2;

        if (type === 'hexes') {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          drawHex(0, 0, p.size, p.opacity * 0.5);
          ctx.restore();
        } else if (type === 'flow') {
          ctx.fillStyle = `rgba(0, 242, 255, ${p.opacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          
          if (!isMobile) {
            // Tail - Skip on mobile for performance
            ctx.strokeStyle = `rgba(0, 242, 255, ${p.opacity * 0.3})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x, p.y + p.size * 5);
            ctx.stroke();
          }
        } else {
          // Digital square drift
          ctx.strokeStyle = `rgba(0, 242, 255, ${p.opacity})`;
          ctx.strokeRect(p.x, p.y, p.size * 10, p.size * 10);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    observer.observe(canvas);

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [type]);


  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity, mixBlendMode: 'screen' }}
    />
  );
};

export default SectionMotion;
