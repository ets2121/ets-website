import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionIntro = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const startTimeRef = useRef(null);
  const [phase, setPhase] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const [exiting, setExiting] = useState(false);

  const TOTAL_DURATION = 18000; // Virtual timeline duration
  const SPEED_MULTIPLIER = 3.0; // Runs 3x faster (6 seconds total)
  const handleSkip = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => onComplete(), 300);
  }, [onComplete, exiting]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w, h, dpr;
    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // === PARTICLE SYSTEM ===
    const particles = Array.from({ length: 150 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 1.8, vy: (Math.random() - 0.5) * 1.8,
      r: Math.random() * 2 + 0.5, alpha: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * Math.PI * 2
    }));

    // === CIRCUIT TRACES ===
    const circuits = Array.from({ length: 8 }, () => {
      const startX = Math.random() * w;
      const startY = Math.random() * h;
      const segments = [];
      let cx = startX, cy = startY;
      for (let i = 0; i < 6 + Math.floor(Math.random() * 6); i++) {
        const horizontal = Math.random() > 0.5;
        const len = 30 + Math.random() * 80;
        const nx = horizontal ? cx + (Math.random() > 0.5 ? len : -len) : cx;
        const ny = horizontal ? cy : cy + (Math.random() > 0.5 ? len : -len);
        segments.push({ x1: cx, y1: cy, x2: nx, y2: ny });
        cx = nx; cy = ny;
      }
      return { segments, progress: 0, speed: 0.015 + Math.random() * 0.02, delay: Math.random() * 4000 };
    });

    // === HOLOGRAPHIC RINGS ===
    const rings = Array.from({ length: 4 }, (_, i) => ({
      radius: 80 + i * 55, rotation: i * 0.5, speed: 0.002 + i * 0.001,
      dashOffset: 0, alpha: 0, segments: 60 + i * 20
    }));

    // === HEX GRID ===
    const hexSize = 35;
    const hexGrid = [];
    for (let row = 0; row < Math.ceil(h / (hexSize * 1.5)) + 2; row++) {
      for (let col = 0; col < Math.ceil(w / (hexSize * 1.73)) + 2; col++) {
        hexGrid.push({
          x: col * hexSize * 1.73 + (row % 2) * hexSize * 0.865,
          y: row * hexSize * 1.5,
          alpha: 0, targetAlpha: 0, delay: Math.random() * 2000,
          glitch: false, glitchTimer: 0
        });
      }
    }

    // === TEXT SEQUENCES (fast pacing) ===
    const textSequences = [
      { text: '[ SYSTEM BOOT ]', start: 0, end: 2200, size: 12, tracking: 8, y: 0.5, mono: true },
      { text: 'LOADING MODULES...', start: 800, end: 2200, size: 10, tracking: 4, y: 0.55, mono: true },
      { text: '///  EASYTECH SOLUTIONS  ///', start: 2500, end: 6000, size: 15, tracking: 6, y: 0.46 },
      { text: 'DIGITAL INFRASTRUCTURE', start: 3200, end: 5500, size: 10, tracking: 6, y: 0.54, mono: true },
      { text: 'WEB DEVELOPMENT', start: 6200, end: 8200, size: 13, tracking: 6, y: 0.44 },
      { text: 'HARDWARE AUTOMATION', start: 8400, end: 10400, size: 13, tracking: 6, y: 0.44 },
      { text: 'IT CONSULTING', start: 10600, end: 12600, size: 13, tracking: 6, y: 0.44 },
      { text: 'ETS', start: 13000, end: 17500, size: 90, tracking: 24, y: 0.47, hero: true },
      { text: 'TECH-DRIVEN OPERATIONS', start: 14000, end: 17500, size: 12, tracking: 8, y: 0.58 },
    ];

    // === GLITCH SYSTEM ===
    let glitchActive = false;
    let glitchIntensity = 0;
    const glitchTimings = [2300, 5800, 8100, 10300, 12800, 16500];

    // === DIGITAL NOISE LINES ===
    const noiseLines = Array.from({ length: 30 }, () => ({
      y: Math.random() * h, speed: 2 + Math.random() * 4, alpha: 0, width: Math.random() * w * 0.4
    }));

    const drawHex = (cx, cy, size, alpha, glitch) => {
      if (alpha < 0.01) return;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        const jitter = glitch ? (Math.random() - 0.5) * 3 : 0;
        const px = cx + size * Math.cos(a) + jitter;
        const py = cy + size * Math.sin(a) + jitter;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = glitch
        ? `rgba(255, 40, 80, ${alpha * 0.4})`
        : `rgba(0, 242, 255, ${alpha * 0.18})`;
      ctx.lineWidth = glitch ? 1.5 : 0.5;
      ctx.stroke();
    };

    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const easeInOut = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const getTextAlpha = (seq, elapsed) => {
      const fadeIn = 350, fadeOut = 300;
      if (elapsed < seq.start || elapsed > seq.end) return 0;
      return easeOut(Math.min(1, (elapsed - seq.start) / fadeIn)) * easeOut(Math.min(1, (seq.end - elapsed) / fadeOut));
    };

    startTimeRef.current = performance.now();

    const animate = (now) => {
      const realElapsed = now - startTimeRef.current;
      const elapsed = realElapsed * SPEED_MULTIPLIER;
      const t = Math.min(elapsed / TOTAL_DURATION, 1);

      if (elapsed < 2500) setPhase(0);
      else if (elapsed < 6000) setPhase(1);
      else if (elapsed < 13000) setPhase(2);
      else setPhase(3);

      // Glitch check
      glitchActive = false;
      glitchTimings.forEach(gt => {
        if (elapsed > gt && elapsed < gt + 150) {
          glitchActive = true;
          glitchIntensity = 1 - (elapsed - gt) / 150;
        }
      });

      // === CLEAR ===
      ctx.fillStyle = '#02132e';
      ctx.fillRect(0, 0, w, h);

      // === GLITCH OFFSET ===
      if (glitchActive) {
        const shift = Math.floor(Math.random() * 8 - 4) * glitchIntensity;
        ctx.save();
        ctx.translate(shift, 0);
      }

      // === VIGNETTE ===
      const vignette = ctx.createRadialGradient(w / 2, h / 2, w * 0.15, w / 2, h / 2, w * 0.85);
      vignette.addColorStop(0, 'rgba(2,19,46,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.7)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      // === HEX GRID ===
      if (elapsed > 500 && elapsed < 17000) {
        const hexFade = Math.min(1, (elapsed - 500) / 1000) * (elapsed > 16000 ? Math.max(0, (17000 - elapsed) / 1000) : 1);
        hexGrid.forEach(hex => {
          hex.targetAlpha = elapsed > hex.delay ? hexFade : 0;
          hex.alpha += (hex.targetAlpha - hex.alpha) * 0.05;
          hex.glitch = glitchActive && Math.random() > 0.7;
          drawHex(hex.x, hex.y, hexSize * 0.35, hex.alpha, hex.glitch);
        });
      }

      // === CIRCUIT TRACES ===
      circuits.forEach(circuit => {
        if (elapsed < circuit.delay) return;
        circuit.progress = Math.min(1, (elapsed - circuit.delay) / 3000);
        const totalSegs = circuit.segments.length;
        const activeSegs = Math.floor(circuit.progress * totalSegs);
        circuit.segments.forEach((seg, idx) => {
          if (idx > activeSegs) return;
          const segProgress = idx === activeSegs ? (circuit.progress * totalSegs - idx) : 1;
          const fadeOut = elapsed > 15000 ? Math.max(0, (17000 - elapsed) / 2000) : 1;
          const alpha = 0.25 * segProgress * fadeOut;
          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x1 + (seg.x2 - seg.x1) * segProgress, seg.y1 + (seg.y2 - seg.y1) * segProgress);
          ctx.strokeStyle = `rgba(0, 242, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          // Node dot at joints
          if (segProgress >= 1) {
            ctx.beginPath();
            ctx.arc(seg.x2, seg.y2, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 242, 255, ${alpha * 1.5})`;
            ctx.fill();
          }
        });
      });

      // === PARTICLES ===
      const introAlpha = Math.min(1, elapsed / 1500);
      const outroAlpha = elapsed > 16000 ? Math.max(0, (18000 - elapsed) / 2000) : 1;
      particles.forEach(p => {
        // Accelerate particles during glitch
        const speed = glitchActive ? 3 : 1;
        p.x += p.vx * speed;
        p.y += p.vy * speed;
        p.pulse += 0.04;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const pulseAlpha = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 255, ${pulseAlpha * introAlpha * outroAlpha * 0.5})`;
        ctx.fill();
      });

      // Particle connections
      if (elapsed > 500) {
        const connAlpha = Math.min(0.15, (elapsed - 500) / 2000) * outroAlpha;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = dx * dx + dy * dy;
            if (dist < 8000) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(0, 242, 255, ${connAlpha * (1 - dist / 8000)})`;
              ctx.lineWidth = 0.4;
              ctx.stroke();
            }
          }
        }
      }

      // === HOLOGRAPHIC RINGS (phase 3 - ETS reveal) ===
      if (elapsed > 12500 && elapsed < 17500) {
        const ringFade = Math.min(1, (elapsed - 12500) / 800) * (elapsed > 16500 ? Math.max(0, (17500 - elapsed) / 1000) : 1);
        rings.forEach(ring => {
          ring.rotation += ring.speed * 16;
          ring.dashOffset += 0.5;
          ctx.save();
          ctx.translate(w / 2, h / 2);
          ctx.rotate(ring.rotation);
          ctx.beginPath();
          ctx.setLineDash([4, 8]);
          ctx.lineDashOffset = ring.dashOffset;
          ctx.arc(0, 0, ring.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 242, 255, ${ringFade * 0.25})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();
        });
      }

      // === SCAN LINES (constant subtle) ===
      for (let sy = 0; sy < h; sy += 3) {
        ctx.fillStyle = 'rgba(0,0,0,0.04)';
        ctx.fillRect(0, sy, w, 1);
      }

      // === MOVING SCAN BAR ===
      const scanY = ((elapsed * 0.08) % (h + 200)) - 100;
      const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      scanGrad.addColorStop(0, 'rgba(0, 242, 255, 0)');
      scanGrad.addColorStop(0.5, 'rgba(0, 242, 255, 0.06)');
      scanGrad.addColorStop(1, 'rgba(0, 242, 255, 0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 30, w, 60);

      // === DIGITAL NOISE ===
      if (glitchActive) {
        for (let i = 0; i < 5; i++) {
          const ny = Math.random() * h;
          const nh = 1 + Math.random() * 3;
          ctx.fillStyle = `rgba(0, 242, 255, ${0.1 * glitchIntensity})`;
          ctx.fillRect(0, ny, w, nh);
        }
        // RGB split noise blocks
        for (let i = 0; i < 3; i++) {
          const bx = Math.random() * w;
          const by = Math.random() * h;
          const bw = 20 + Math.random() * 60;
          const bh = 2 + Math.random() * 8;
          ctx.fillStyle = `rgba(255, 0, 80, ${0.08 * glitchIntensity})`;
          ctx.fillRect(bx + 2, by, bw, bh);
          ctx.fillStyle = `rgba(0, 242, 255, ${0.08 * glitchIntensity})`;
          ctx.fillRect(bx - 2, by, bw, bh);
        }
      }

      // === CENTER GLOW (ETS phase) ===
      if (elapsed > 12500 && elapsed < 17500) {
        const glowAlpha = Math.min(0.2, (elapsed - 12500) / 2000) * (elapsed > 16500 ? Math.max(0, (17500 - elapsed) / 1000) : 1);
        const pulse = 0.8 + 0.2 * Math.sin(elapsed * 0.005);
        const glow = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, 200 * pulse);
        glow.addColorStop(0, `rgba(0, 242, 255, ${glowAlpha})`);
        glow.addColorStop(0.5, `rgba(0, 242, 255, ${glowAlpha * 0.3})`);
        glow.addColorStop(1, 'rgba(0, 242, 255, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, w, h);
      }

      // === CORNER BRACKETS ===
      if (elapsed > 300 && elapsed < 17500) {
        const brAlpha = Math.min(0.6, (elapsed - 300) / 1000) * (elapsed > 16500 ? Math.max(0, (17500 - elapsed) / 1000) : 1);
        const brSize = 25;
        const margin = 30;
        ctx.strokeStyle = `rgba(0, 242, 255, ${brAlpha})`;
        ctx.lineWidth = 1.5;
        [[margin, margin, 1, 1], [w - margin, margin, -1, 1], [margin, h - margin, 1, -1], [w - margin, h - margin, -1, -1]].forEach(([x, y, dx, dy]) => {
          ctx.beginPath();
          ctx.moveTo(x, y + brSize * dy);
          ctx.lineTo(x, y);
          ctx.lineTo(x + brSize * dx, y);
          ctx.stroke();
        });
      }

      // === TEXT RENDERING ===
      textSequences.forEach(seq => {
        const alpha = getTextAlpha(seq, elapsed);
        if (alpha < 0.01) return;
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (seq.hero) {
          ctx.font = `800 ${seq.size}px "Space Grotesk", sans-serif`;
          // Glowing hero text
          ctx.shadowColor = 'rgba(0, 242, 255, 0.8)';
          ctx.shadowBlur = 40;
          ctx.fillStyle = `rgba(0, 242, 255, ${alpha})`;
          ctx.letterSpacing = `${seq.tracking}px`;
          ctx.fillText(seq.text, w / 2, h * seq.y);
          // Double pass for extra glow
          ctx.shadowBlur = 80;
          ctx.fillStyle = `rgba(0, 242, 255, ${alpha * 0.3})`;
          ctx.fillText(seq.text, w / 2, h * seq.y);
        } else if (seq.mono) {
          ctx.font = `500 ${seq.size}px "Courier New", monospace`;
          ctx.fillStyle = `rgba(0, 242, 255, ${alpha * 0.7})`;
          ctx.shadowColor = 'rgba(0, 242, 255, 0.3)';
          ctx.shadowBlur = 8;
          ctx.letterSpacing = `${seq.tracking}px`;
          // Typewriter
          const typeP = Math.min(1, (elapsed - seq.start) / 500);
          const chars = Math.floor(typeP * seq.text.length);
          let display = seq.text.substring(0, chars);
          if (typeP < 1 && Math.sin(elapsed * 0.015) > 0) display += '█';
          ctx.fillText(display, w / 2, h * seq.y);
        } else {
          ctx.font = `600 ${seq.size}px "Space Grotesk", sans-serif`;
          ctx.fillStyle = `rgba(215, 226, 255, ${alpha * 0.95})`;
          ctx.shadowColor = 'rgba(0, 242, 255, 0.25)';
          ctx.shadowBlur = 12;
          ctx.letterSpacing = `${seq.tracking}px`;
          // Typewriter
          const typeP = Math.min(1, (elapsed - seq.start) / 500);
          const chars = Math.floor(typeP * seq.text.length);
          let display = seq.text.substring(0, chars);
          if (typeP < 1 && Math.sin(elapsed * 0.015) > 0) display += '█';
          ctx.fillText(display, w / 2, h * seq.y);
        }
        ctx.restore();
      });

      // === DATA STREAMS (both sides) ===
      if (elapsed > 1000 && elapsed < 17000) {
        const dsAlpha = Math.min(0.35, (elapsed - 1000) / 1500) * (elapsed > 15500 ? Math.max(0, (17000 - elapsed) / 1500) : 1);
        ctx.font = '9px monospace';
        const chars = '01001110100110101011100010101110010';
        for (let i = 0; i < 20; i++) {
          const dy = ((elapsed * 0.06 + i * 28) % (h + 100)) - 50;
          const sub = chars.substring((Math.floor(elapsed * 0.02) + i * 3) % chars.length);
          ctx.fillStyle = `rgba(0, 242, 255, ${dsAlpha * (0.3 + 0.7 * Math.sin(i + elapsed * 0.003))})`;
          ctx.fillText(sub.substring(0, 8), w - 65, dy);
          ctx.fillText(sub.substring(2, 10), 20, dy + 14);
        }
      }

      // === HUD STATUS TEXT ===
      if (elapsed > 200 && elapsed < 17000) {
        const hudAlpha = Math.min(0.3, (elapsed - 200) / 1000) * (elapsed > 15500 ? Math.max(0, (17000 - elapsed) / 1500) : 1);
        ctx.font = '8px monospace';
        ctx.fillStyle = `rgba(0, 242, 255, ${hudAlpha})`;
        ctx.textAlign = 'left';
        ctx.fillText(`SYS.LOAD: ${Math.min(100, Math.floor(t * 100))}%`, 30, h - 45);
        ctx.fillText(`FRAME: ${Math.floor(elapsed / 16.67)}`, 30, h - 33);
        ctx.textAlign = 'right';
        ctx.fillText(`NET: ACTIVE`, w - 30, h - 45);
        ctx.fillText(`LAT: ${Math.floor(Math.random() * 5 + 1)}ms`, w - 30, h - 33);
      }

      // === PROGRESS BAR ===
      const barY = h - 18;
      const barW = w * 0.25;
      const barX = (w - barW) / 2;
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      ctx.fillRect(barX, barY, barW, 2);
      const progGrad = ctx.createLinearGradient(barX, 0, barX + barW * t, 0);
      progGrad.addColorStop(0, 'rgba(0, 242, 255, 0.3)');
      progGrad.addColorStop(1, 'rgba(0, 242, 255, 0.8)');
      ctx.fillStyle = progGrad;
      ctx.fillRect(barX, barY, barW * t, 2);
      // Glow dot at progress tip
      if (t > 0.02) {
        ctx.beginPath();
        ctx.arc(barX + barW * t, barY + 1, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 255, 0.6)`;
        ctx.fill();
      }

      if (glitchActive) ctx.restore();

      // === AUTO-COMPLETE ===
      if (elapsed >= TOTAL_DURATION) {
        setExiting(true);
        setTimeout(() => onComplete(), 300);
        return;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [onComplete, TOTAL_DURATION]);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          className="fixed inset-0 z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />

          {/* Phase dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: phase >= i ? 'rgba(0,242,255,0.8)' : 'rgba(255,255,255,0.12)',
                  transform: phase === i ? 'scale(1.8)' : 'scale(1)',
                  boxShadow: phase === i ? '0 0 10px rgba(0,242,255,0.6)' : 'none'
                }}
              />
            ))}
          </div>

          {/* Skip button */}
          {showSkip && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              onClick={handleSkip}
              className="absolute bottom-6 right-6 text-[10px] font-space text-white/30 hover:text-accent border border-white/8 hover:border-accent/50 px-3 py-1.5 rounded-md transition-all duration-300 backdrop-blur-sm cursor-pointer z-[10000] tracking-widest"
            >
              SKIP →
            </motion.button>
          )}
        </motion.div>
      ) : (
        <motion.div
          className="fixed inset-0 z-[9999] bg-primary-bg"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      )}
    </AnimatePresence>
  );
};

export default MotionIntro;
