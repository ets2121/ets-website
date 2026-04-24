import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import aboutData from '../data/about.json';

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="about" ref={ref} className="py-24 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          
          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">{aboutData.badgeText}</span>
            <h2 className="mt-2 mb-8 text-3xl sm:text-4xl md:text-5xl">{aboutData.headline}</h2>
            
            {aboutData.paragraphs.map((p, pIdx) => (
              <motion.p 
                key={pIdx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + (pIdx * 0.1) }}
                className="mb-6 text-on-surface-variant text-base sm:text-lg leading-relaxed"
              >
                {p}
              </motion.p>
            ))}

            <div className="mt-12">
              <p className="text-white font-bold mb-6 text-xs sm:text-sm uppercase tracking-[0.2em]">Core Technology Stack</p>
              <div className="flex flex-wrap gap-4">
                {aboutData.stack.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    className="obsidian-glass px-4 py-2.5 flex items-center gap-3 rounded-xl border-white/5 hover:border-accent/50 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -3 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + (idx * 0.05) }}
                  >
                    <img src={item.path} alt={item.name} className="w-5 h-5 grayscale group-hover:grayscale-0" />
                    <span className="font-semibold text-sm text-white/90">{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Image Side with 3D Frame */}
          <motion.div 
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:order-last order-first mb-12 lg:mb-0 perspective-1000"
          >
            {/* 3D Floating Frame */}
            <motion.div 
              className="relative p-2 rounded-[2rem] group"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Outer Cyber Glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-accent via-accent/5 to-accent/40 rounded-[2rem] blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-700"></div>
              
              {/* Perspective Container */}
              <motion.div 
                className="relative bg-surface rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
                whileHover={{ rotateX: 8, rotateY: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <img 
                  src={aboutData.image} 
                  alt={aboutData.altText} 
                  className="w-full aspect-square object-cover object-top scale-105"
                  style={{ transform: "translateZ(50px)" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
