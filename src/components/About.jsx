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

          {/* Image Side with Fancy Shape */}
          <motion.div 
            style={{ y: imageY }}
            initial={{ opacity: 0, rotate: 5, scale: 0.9 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:order-last order-first mb-12 lg:mb-0"
          >
            <motion.div 
              className="relative overflow-hidden p-2 bg-white/5 shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
              animate={{ 
                clipPath: [
                  "polygon(15% 0, 100% 5%, 85% 100%, 0 95%)",
                  "polygon(5% 10%, 95% 0, 100% 90%, 10% 100%)",
                  "polygon(15% 0, 100% 5%, 85% 100%, 0 95%)"
                ]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <img 
                src={aboutData.image} 
                alt={aboutData.altText} 
                className="w-full aspect-square object-cover"
              />
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -right-4 sm:bottom-8 sm:-right-4 p-5 obsidian-glass border-accent/40 shadow-2xl z-20 flex flex-col items-center min-w-[120px]"
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-accent font-extrabold text-4xl leading-none">5+</p>
              <p className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest text-center mt-1">Years of <br />Engineering</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
