import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import brandData from '../data/brand.json';

const FacebookIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const GithubIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const Contact = ({ setCurrentPage }) => {
  return (
    <footer id="contact" className="bg-primary-bg border-t border-white/5">
      <div className="container mx-auto px-6 pt-24 pb-12">
        
        <div className="grid lg:grid-cols-2 gap-20 mb-24 items-center">
          
          {/* Form Block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="obsidian-glass p-8 sm:p-12 border-white/5"
          >
            <h2 className="text-3xl sm:text-4xl text-white mb-4">Let's build the future.</h2>
            <p className="text-on-surface-variant mb-10 text-base sm:text-lg">Digitize your business operations with our custom technical solutions.</p>
            
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your Name" required className="w-full p-5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent transition-colors" />
              <input type="email" placeholder="Email Address" required className="w-full p-5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent transition-colors" />
              <select className="w-full p-5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent transition-colors appearance-none" required defaultValue="">
                <option value="" disabled className="bg-primary-bg">Select Service Needed</option>
                <option value="software" className="bg-primary-bg">Software Development</option>
                <option value="hardware" className="bg-primary-bg">Hardware & Prototyping</option>
                <option value="support" className="bg-primary-bg">IT Support & Triage</option>
              </select>
              <textarea placeholder="Tell us about your project..." rows="4" required className="w-full p-5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent transition-colors resize-none"></textarea>
              <button type="submit" className="btn btn-primary w-full py-5 rounded-2xl text-lg mt-4 shadow-2xl shadow-accent/20">
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Info Block */}
          <div className="flex flex-col justify-center">
            <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm mb-2">Contact Us</span>
            <h2 className="text-3xl sm:text-4xl mb-12">Get in touch with our experts.</h2>
            
            <div className="space-y-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold mb-1">Phone</p>
                  <p className="text-xl text-white font-bold">{brandData.contact.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold mb-1">Email</p>
                  <p className="text-xl text-white font-bold">{brandData.contact.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold mb-1">Office</p>
                  <p className="text-xl text-white font-bold">
                    {brandData.contact.addressLine1},<br />{brandData.contact.addressLine2}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand/Nav Grid */}
        <div className="pt-16 border-t border-white/5 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="lg:col-span-1 md:col-span-2">
            <div 
              onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3 mb-8 cursor-pointer group"
            >
              <img src={brandData.logo.default} alt={brandData.logo.altText} className="h-8 w-auto rounded-md group-hover:scale-105 transition-transform" />
              <span className="text-2xl font-bold text-white font-space">ETS</span>
            </div>
            <p className="text-on-surface-variant leading-relaxed text-sm max-w-xs">
              High-end technology tailored for local businesses. We modernize operations to save you time and maximize profit.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 text-lg">Navigation</h4>
            <div className="flex flex-col gap-4">
              <a href="#services" className="text-on-surface-variant hover:text-accent transition-colors text-sm sm:text-base">Services</a>
              <a href="#portfolio" className="text-on-surface-variant hover:text-accent transition-colors text-sm sm:text-base">Portfolio</a>
              <a href="#about" className="text-on-surface-variant hover:text-accent transition-colors text-sm sm:text-base">Our Company</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('brand'); window.scrollTo(0,0); }} className="text-on-surface-variant hover:text-accent transition-colors text-sm sm:text-base flex items-center gap-2">
                Brand Identity <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 text-lg">Hours</h4>
            <p className="text-white font-bold text-sm sm:text-base mb-1">{brandData.contact.businessHours.days}</p>
            <p className="text-on-surface-variant text-sm sm:text-base">{brandData.contact.businessHours.hours}</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 text-lg">Legal</h4>
            <div className="flex flex-col gap-4">
              <a href="#" className="text-on-surface-variant hover:text-accent transition-colors text-sm sm:text-base">Privacy Policy</a>
              <a href="#" className="text-on-surface-variant hover:text-accent transition-colors text-sm sm:text-base">Terms of Service</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-20 pt-10 border-t border-white/5">
          <p className="text-on-surface-variant text-xs sm:text-sm text-center sm:text-left">
            &copy; {brandData.copyrightYear} EasyTech Solutions. Built with precision.
          </p>
          
          <div className="flex items-center gap-6">
            {brandData.social.facebook && brandData.social.facebook !== "#" && (
              <a href={brandData.social.facebook} target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-accent transition-colors">
                <FacebookIcon size={20} />
              </a>
            )}
            {brandData.social.linkedin && brandData.social.linkedin !== "#" && (
              <a href={brandData.social.linkedin} target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-accent transition-colors">
                <LinkedinIcon size={20} />
              </a>
            )}
            {brandData.social.instagram && brandData.social.instagram !== "#" && (
              <a href={brandData.social.instagram} target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-accent transition-colors">
                <InstagramIcon size={20} />
              </a>
            )}
            {brandData.social.github && brandData.social.github !== "#" && (
              <a href={brandData.social.github} target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-accent transition-colors">
                <GithubIcon size={20} />
              </a>
            )}
            <div className="w-1 h-1 rounded-full bg-accent/30 mx-2 hidden sm:block"></div>
            
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Contact;
