import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroData from '../data/hero.json';

const Hero = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ["0%", "30%"]);
  const contentY = useTransform(scrollY, [0, 1000], ["0%", "15%"]);

  return (
    <section 
      id="hero" 
      ref={ref}
      className="relative flex items-center overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      {/* Background with Parallax Image */}
      <motion.div 
        className="absolute inset-x-0 -top-20 -bottom-20 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(2, 19, 46, 0.95) 0%, rgba(2, 19, 46, 0.75) 100%), url(${heroData.backgroundImage})`,
          y: backgroundY
        }}
      ></motion.div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="grid lg:grid-cols-2 items-center gap-10 lg:gap-12"
          style={{ y: contentY }}
        >
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gradient font-black leading-[1.05] mb-6 tracking-tight">
              {heroData.headline.split('. ')[0]}. <br />
              <span className="text-white block mt-1">{heroData.headline.split('. ')[1]}</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-on-surface-variant mb-8 max-w-[600px] text-base sm:text-lg leading-relaxed"
            >
              {heroData.subheadline}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a href={heroData.primaryCTA.link} className="btn btn-primary px-8 py-4 rounded-xl text-base shadow-lg shadow-accent/10">
                {heroData.primaryCTA.text}
              </a>
              <a href={heroData.secondaryCTA.link} className="btn btn-outline px-8 py-4 rounded-xl text-base bg-white/5">
                {heroData.secondaryCTA.text}
              </a>
            </motion.div>
          </motion.div>

          {/* Visual Content (Mockup) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-[450px] mx-auto group mt-8 lg:mt-0"
          >
            <div className="absolute -inset-8 bg-accent/20 blur-[100px] rounded-full group-hover:bg-accent/30 transition-all duration-700"></div>
            <motion.div 
              className="obsidian-glass p-2 relative overflow-hidden shadow-2xl shadow-black/80"
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img 
                src={heroData.mockupImage.url} 
                alt={heroData.mockupImage.alt} 
                className="w-full rounded-lg block"
              />
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;


