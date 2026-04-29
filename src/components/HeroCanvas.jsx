import React, { useRef, useEffect, useCallback } from 'react';

const HeroCanvas = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const isVisibleRef = useRef(false);
  const startRef = useRef(null);

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = rect.width;
    const h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Intersection Observer — play only when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !animRef.current) {
          startRef.current = performance.now();
          animRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(canvas);

    let env = setup();
    if (!env) return;
    let { ctx, w, h } = env;

    const handleResize = () => {
      env = setup();
      if (env) { ctx = env.ctx; w = env.w; h = env.h; initSystems(); }
    };
    window.addEventListener('resize', handleResize);

    // === SYSTEMS ===
    let particles, nodes, rings, hexCells, circuitPaths;

    const initSystems = () => {
      // Floating particles
      particles = Array.from({ length: 80 }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 2 + 0.4, phase: Math.random() * Math.PI * 2
      }));

      // Central node constellation
      const cx = w * 0.5, cy = h * 0.5;
      nodes = Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 60 + Math.random() * 50;
        return {
          baseX: cx + Math.cos(angle) * radius,
          baseY: cy + Math.sin(angle) * radius,
          x: 0, y: 0, orbitSpeed: 0.0003 + Math.random() * 0.0005,
          orbitRadius: 5 + Math.random() * 10, orbitPhase: Math.random() * Math.PI * 2,
          size: 2 + Math.random() * 2, connections: []
        };
      });
      // Build connections
      nodes.forEach((n, i) => {
        const others = nodes.filter((_, j) => j !== i)
          .sort((a, b) => {
            const da = Math.hypot(a.baseX - n.baseX, a.baseY - n.baseY);
            const db = Math.hypot(b.baseX - n.baseX, b.baseY - n.baseY);
            return da - db;
          });
        n.connections = others.slice(0, 3).map(o => nodes.indexOf(o));
      });

      // Holographic rings
      rings = Array.from({ length: 3 }, (_, i) => ({
        radius: 90 + i * 40, speed: 0.0008 + i * 0.0004,
        rotation: i * 1.2, dashLen: 3 + i * 2, gapLen: 6 + i * 3
      }));

      // Hex background cells
      const hSize = 28;
      hexCells = [];
      for (let row = 0; row < Math.ceil(h / (hSize * 1.5)) + 1; row++) {
        for (let col = 0; col < Math.ceil(w / (hSize * 1.73)) + 1; col++) {
          const hx = col * hSize * 1.73 + (row % 2) * hSize * 0.865;
          const hy = row * hSize * 1.5;
          const dist = Math.hypot(hx - w / 2, hy - h / 2);
          hexCells.push({ x: hx, y: hy, dist, alpha: 0 });
        }
      }

      // Circuit paths
      circuitPaths = Array.from({ length: 5 }, () => {
        const segs = [];
        let sx = Math.random() * w, sy = Math.random() * h;
        for (let i = 0; i < 4 + Math.floor(Math.random() * 4); i++) {
          const horiz = Math.random() > 0.5;
          const len = 20 + Math.random() * 50;
          const ex = horiz ? sx + (Math.random() > 0.5 ? len : -len) : sx;
          const ey = horiz ? sy : sy + (Math.random() > 0.5 ? len : -len);
          segs.push({ x1: sx, y1: sy, x2: ex, y2: ey });
          sx = ex; sy = ey;
        }
        return { segs, progress: 0 };
      });
    };
    initSystems();

    const drawHex = (cx, cy, size, alpha) => {
      if (alpha < 0.005) return;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        const px = cx + size * Math.cos(a);
        const py = cy + size * Math.sin(a);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0, 242, 255, ${alpha})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    function animate(now) {
      if (!isVisibleRef.current) {
        animRef.current = null;
        return;
      }
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;

      // Clear with slight gradient
      const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7);
      bg.addColorStop(0, 'rgba(15, 31, 59, 0.95)');
      bg.addColorStop(1, 'rgba(2, 19, 46, 0.98)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // === HEX GRID (pulsing from center) ===
      const pulseWave = (elapsed * 0.04) % (Math.max(w, h) * 0.8);
      hexCells.forEach(hex => {
        const waveDist = Math.abs(hex.dist - pulseWave);
        const waveAlpha = waveDist < 60 ? (1 - waveDist / 60) * 0.12 : 0;
        hex.alpha += (waveAlpha + 0.02 - hex.alpha) * 0.08;
        drawHex(hex.x, hex.y, 10, hex.alpha);
      });

      // === CIRCUIT PATHS ===
      circuitPaths.forEach(cp => {
        cp.progress = ((elapsed * 0.0003) % 1.5);
        const totalSegs = cp.segs.length;
        cp.segs.forEach((seg, idx) => {
          const segStart = idx / totalSegs;
          const segEnd = (idx + 1) / totalSegs;
          let segP = Math.max(0, Math.min(1, (cp.progress - segStart) / (segEnd - segStart)));
          if (cp.progress > 1.2) segP *= Math.max(0, (1.5 - cp.progress) / 0.3);
          if (segP < 0.01) return;

          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x1 + (seg.x2 - seg.x1) * segP, seg.y1 + (seg.y2 - seg.y1) * segP);
          ctx.strokeStyle = `rgba(0, 242, 255, ${0.2 * segP})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          if (segP >= 0.99) {
            ctx.beginPath();
            ctx.arc(seg.x2, seg.y2, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 242, 255, 0.35)';
            ctx.fill();
          }
        });
      });

      // === PARTICLES ===
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.03;
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5;
        if (p.y > h + 5) p.y = -5;

        const alpha = 0.25 + 0.25 * Math.sin(p.phase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 255, ${alpha})`;
        ctx.fill();
      });

      // Particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 5000) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 242, 255, ${0.08 * (1 - d2 / 5000)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      // === CENTRAL NODE CONSTELLATION ===
      nodes.forEach((n, i) => {
        n.orbitPhase += n.orbitSpeed * 16;
        n.x = n.baseX + Math.cos(n.orbitPhase) * n.orbitRadius;
        n.y = n.baseY + Math.sin(n.orbitPhase) * n.orbitRadius;
      });

      // Node connections with data pulse
      nodes.forEach((n) => {
        n.connections.forEach(ci => {
          const other = nodes[ci];
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = 'rgba(0, 242, 255, 0.12)';
          ctx.lineWidth = 0.6;
          ctx.stroke();

          // Traveling data pulse
          const pulseT = ((elapsed * 0.0008 + ci * 0.3) % 1);
          const px = n.x + (other.x - n.x) * pulseT;
          const py = n.y + (other.y - n.y) * pulseT;
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 242, 255, ${0.6 * (1 - Math.abs(pulseT - 0.5) * 2)})`;
          ctx.fill();
        });
      });

      // Node dots
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 242, 255, 0.5)';
        ctx.fill();
        // Glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 242, 255, 0.04)';
        ctx.fill();
      });

      // === HOLOGRAPHIC RINGS ===
      const centerX = w * 0.5, centerY = h * 0.5;
      rings.forEach(ring => {
        ring.rotation += ring.speed * 16;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(ring.rotation);
        ctx.beginPath();
        ctx.setLineDash([ring.dashLen, ring.gapLen]);
        ctx.arc(0, 0, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 242, 255, 0.12)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      });

      // === SCAN LINE ===
      const scanY = ((elapsed * 0.04) % (h + 60)) - 30;
      const scanGrad = ctx.createLinearGradient(0, scanY - 15, 0, scanY + 15);
      scanGrad.addColorStop(0, 'rgba(0, 242, 255, 0)');
      scanGrad.addColorStop(0.5, 'rgba(0, 242, 255, 0.04)');
      scanGrad.addColorStop(1, 'rgba(0, 242, 255, 0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 15, w, 30);

      // === CRT SCANLINES ===
      for (let sy = 0; sy < h; sy += 3) {
        ctx.fillStyle = 'rgba(0,0,0,0.03)';
        ctx.fillRect(0, sy, w, 1);
      }

      // === CORNER MARKERS ===
      const m = 12, s = 16;
      ctx.strokeStyle = 'rgba(0, 242, 255, 0.3)';
      ctx.lineWidth = 1;
      [[m, m, 1, 1], [w - m, m, -1, 1], [m, h - m, 1, -1], [w - m, h - m, -1, -1]].forEach(([x, y, dx, dy]) => {
        ctx.beginPath();
        ctx.moveTo(x, y + s * dy);
        ctx.lineTo(x, y);
        ctx.lineTo(x + s * dx, y);
        ctx.stroke();
      });

      animRef.current = requestAnimationFrame(animate);
    }

    // Start if already visible
    if (isVisibleRef.current) {
      startRef.current = performance.now();
      animRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [setup]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full rounded-2xl"
      style={{ opacity: 0.85 }}
    />
  );
};

export default HeroCanvas;
