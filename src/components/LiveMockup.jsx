import React from 'react';
import { motion } from 'framer-motion';
import HeroCanvas from './HeroCanvas';

const LiveMockup = ({ imageUrl, alt }) => {
  return (
    <motion.div 
      className="relative w-full aspect-square max-w-[500px] mx-auto group"
      initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      whileHover={{ scale: 1.02, rotateY: 5 }}
    >
      {/* Dynamic Glow */}
      <div className="absolute -inset-10 bg-accent/20 blur-[120px] rounded-full group-hover:bg-accent/30 transition-all duration-700 animate-pulse"></div>
      
      <div className="obsidian-glass p-2 relative overflow-hidden shadow-[0_0_50px_rgba(0,242,255,0.2)] border-accent/20">
        
        {/* Background Animation Layer */}
        <div className="absolute inset-0 z-0 opacity-60">
          <HeroCanvas />
        </div>

        {/* Mockup Image - Now animated with floating motion */}
        <motion.img 
          src={imageUrl} 
          alt={alt} 
          className="w-full h-full object-cover rounded-lg block relative z-10 mix-blend-lighten"
          animate={{ 
            y: [0, -8, 0],
            scale: [1, 1.01, 1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        {/* Live Overlays */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Horizontal Scanning Line */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_15px_rgba(0,242,255,1)] z-30"
            animate={{ top: ['-5%', '105%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Vertical Scanning Line */}
          <motion.div 
            className="absolute top-0 left-0 w-[1.5px] h-full bg-gradient-to-b from-transparent via-accent to-transparent shadow-[0_0_15px_rgba(0,242,255,1)] z-30"
            animate={{ left: ['-5%', '105%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
          />

          {/* Corner Framing Brackets */}
          {[
            { top: 20, left: 20, borderTop: '2px solid', borderLeft: '2px solid' },
            { top: 20, right: 20, borderTop: '2px solid', borderRight: '2px solid' },
            { bottom: 20, left: 20, borderBottom: '2px solid', borderLeft: '2px solid' },
            { bottom: 20, right: 20, borderBottom: '2px solid', borderRight: '2px solid' },
          ].map((style, i) => (
            <motion.div
              key={`bracket-${i}`}
              className="absolute w-6 h-6 border-accent/40 z-30"
              style={style}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}

          {/* Target Crosshair */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 z-30">
            <motion.div 
              className="w-24 h-24 border border-accent rounded-full relative"
              animate={{ rotate: 360, scale: [0.9, 1.1, 0.9] }}
              transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity } }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-accent" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-accent" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-4 bg-accent" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-4 bg-accent" />
            </motion.div>
          </div>

          {/* Pulsing Data Points */}
          {[
            { top: '25%', left: '35%' },
            { top: '50%', left: '75%' },
            { top: '75%', left: '20%' },
            { top: '65%', left: '60%' },
            { top: '15%', left: '65%' },
          ].map((pos, i) => (
            <motion.div
              key={`point-${i}`}
              className="absolute w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_10px_rgba(0,242,255,1)] z-30"
              style={pos}
              animate={{ scale: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}

          {/* Floating HUD Elements */}
          <motion.div 
            className="absolute bottom-8 left-8 text-[9px] font-mono text-accent space-y-1 z-30 bg-black/20 p-2 rounded backdrop-blur-sm"
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span>SYS.LINK: ESTABLISHED</span>
            </div>
            <div>[ PROBING_INTERFACE... ]</div>
            <div>ID_AUTH: VERIFIED</div>
            <motion.div 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              SIGNAL_STRENGTH: 98%
            </motion.div>
          </motion.div>

          <motion.div 
            className="absolute top-8 right-8 text-[9px] font-mono text-accent text-right z-30 bg-black/20 p-2 rounded backdrop-blur-sm"
            animate={{ y: [2, -2, 2] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="text-accent/60 mb-1">SCAN_COORD_04</div>
            <div className="font-bold">LAT: 14.5995° N</div>
            <div className="font-bold">LON: 120.9842° E</div>
            <div className="mt-1 text-[8px] opacity-70">NODE_REF: ETS_PRV_01</div>
          </motion.div>
        </div>

        {/* Digital Glitch Overlay (Subtle) */}
        <motion.div 
          className="absolute inset-0 bg-accent/5 z-15 mix-blend-overlay pointer-events-none"
          animate={{ 
            opacity: [0, 0.15, 0],
            x: [0, 2, -2, 0]
          }}
          transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 4 }}
        />
      </div>
    </motion.div>
  );
};

export default LiveMockup;
