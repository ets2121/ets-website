import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import brandData from '../data/brand.json';

const Contact = ({ setCurrentPage }) => {
  return (
    <footer id="contact" style={{ background: '#071224', paddingTop: '5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', paddingBottom: '4rem' }}>
        
        {/* Form Block (Glassmorphism) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          style={{ flex: '1 1 400px', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', padding: '2.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
        >
          <h2 style={{ marginBottom: '1.5rem', color: '#FFF' }}>Ready to digitize your business?</h2>
          <p style={{ color: '#B0C4DE', marginBottom: '2rem' }}>Leave your details below and we will get back to you with a free technical strategy and quote to remove all your friction.</p>
          
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Your Name" required style={inputStyle} />
            <input type="email" placeholder="Email Address" required style={inputStyle} />
            <select style={inputStyle} required defaultValue="">
              <option value="" disabled>Select Service Needed</option>
              <option value="software">Software Development</option>
              <option value="hardware">Hardware & Prototyping</option>
              <option value="support">IT Support & Triage</option>
            </select>
            <textarea placeholder="Tell us about your project..." rows="4" required style={{...inputStyle, resize: 'vertical'}}></textarea>
            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', alignSelf: 'flex-start', padding: '1rem 3rem', background: '#00F2FF', color: '#0B1C38', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 14px rgba(0,242,255,0.4)' }} onMouseOver={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}>Send Message</button>
          </form>
        </motion.div>

        {/* Info Block */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2.5rem', background: 'rgba(255,255,255,0.01)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.03)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
        >
          <div>
            <h3 style={{ color: '#FFF', marginBottom: '1rem' }}>Contact Information</h3>
            <p style={{ color: '#B0C4DE', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Whether you need custom software, IT triage, or hardware prototyping, we are here to help your business scale efficiently.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={contactItemStyle}>
                <div style={{ padding: '12px', background: 'rgba(0,242,255,0.1)', borderRadius: '8px' }}>
                  <Phone color="#00F2FF" size={24} />
                </div>
                <div>
                  <h4 style={labelStyle}>Phone Number</h4>
                  <p style={valueStyle}>{brandData.contact.phone}</p>
                </div>
              </div>
              
              <div style={contactItemStyle}>
                <div style={{ padding: '12px', background: 'rgba(0,242,255,0.1)', borderRadius: '8px' }}>
                  <Mail color="#00F2FF" size={24} />
                </div>
                <div>
                  <h4 style={labelStyle}>Email Address</h4>
                  <p style={valueStyle}>{brandData.contact.email}</p>
                </div>
              </div>

              <div style={contactItemStyle}>
                <div style={{ padding: '12px', background: 'rgba(0,242,255,0.1)', borderRadius: '8px' }}>
                  <MapPin color="#00F2FF" size={24} />
                </div>
                <div>
                  <h4 style={labelStyle}>Office Location</h4>
                  <p style={valueStyle}>{brandData.contact.addressLine1},<br />{brandData.contact.addressLine2}</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
            <h4 style={{ color: '#B0C4DE', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Business Hours</h4>
            <p style={{ color: '#FFF', margin: 0, fontWeight: 500 }}>{brandData.contact.businessHours.days}</p>
            <p style={{ color: '#64748B', margin: 0, fontSize: '0.9rem' }}>{brandData.contact.businessHours.hours}</p>
          </div>
        </motion.div>
      </div>

      {/* Pro Footer Layer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '4rem 0 2rem 0', backgroundColor: '#040B17', color: '#B0C4DE' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-between', marginBottom: '3rem' }}>
            
            {/* Brand Col */}
            <div style={{ flex: '1 1 300px' }}>
              <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={brandData.logo.default} alt={brandData.logo.altText} style={{ borderRadius: '4px', border: '1px solid rgba(0,242,255,0.3)', height: '40px' }} />
                <span style={{ color: '#00F2FF', fontWeight: 700, fontSize: '1.5rem', fontFamily: 'Montserrat, sans-serif', letterSpacing: '1px' }}>ETS</span>
              </div>
              <p style={{ lineHeight: 1.6, fontSize: '0.95rem' }}>
                {brandData.companyName}: High-end technology tailored for local businesses. We modernize operations to save you time and maximize profit.
              </p>
            </div>

            {/* Links Col */}
            <div style={{ flex: '1 1 150px' }}>
              <h4 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '1rem' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a href="#contact" style={{ color: '#B0C4DE', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e=>e.currentTarget.style.color='#00F2FF'} onMouseOut={e=>e.currentTarget.style.color='#B0C4DE'} onClick={(e) => { e.preventDefault(); if(setCurrentPage) { setCurrentPage('brand'); window.scrollTo(0,0); } }}>Brand Identity</a></li>
                <li><a href="#services" style={{ color: '#B0C4DE', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e=>e.currentTarget.style.color='#00F2FF'} onMouseOut={e=>e.currentTarget.style.color='#B0C4DE'} onClick={() => setCurrentPage && setCurrentPage('home')}>Services</a></li>
                <li><a href="#portfolio" style={{ color: '#B0C4DE', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e=>e.currentTarget.style.color='#00F2FF'} onMouseOut={e=>e.currentTarget.style.color='#B0C4DE'} onClick={() => setCurrentPage && setCurrentPage('home')}>Portfolio</a></li>
                <li><a href="#about" style={{ color: '#B0C4DE', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e=>e.currentTarget.style.color='#00F2FF'} onMouseOut={e=>e.currentTarget.style.color='#B0C4DE'} onClick={() => setCurrentPage && setCurrentPage('home')}>About Us</a></li>
              </ul>
            </div>

            {/* Socials Col */}
            <div style={{ flex: '1 1 150px' }}>
              <h4 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '1rem' }}>Connect</h4>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href={brandData.social.facebook} style={{ color: '#B0C4DE', transition: 'color 0.3s' }} onMouseOver={e=>e.currentTarget.style.color='#00F2FF'} onMouseOut={e=>e.currentTarget.style.color='#B0C4DE'}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href={brandData.social.linkedin} style={{ color: '#B0C4DE', transition: 'color 0.3s' }} onMouseOver={e=>e.currentTarget.style.color='#00F2FF'} onMouseOut={e=>e.currentTarget.style.color='#B0C4DE'}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href={brandData.social.instagram} style={{ color: '#B0C4DE', transition: 'color 0.3s' }} onMouseOver={e=>e.currentTarget.style.color='#00F2FF'} onMouseOut={e=>e.currentTarget.style.color='#B0C4DE'}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href={brandData.social.github} style={{ color: '#B0C4DE', transition: 'color 0.3s' }} onMouseOver={e=>e.currentTarget.style.color='#00F2FF'} onMouseOut={e=>e.currentTarget.style.color='#B0C4DE'}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
            <p style={{ margin: 0, color: '#B0C4DE', fontSize: '0.95rem', fontStyle: 'italic' }}>
              {brandData.motto}
            </p>
            <p style={{ margin: 0, color: '#64748B', fontSize: '0.85rem' }}>
              &copy; {brandData.copyrightYear} {brandData.companyName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const inputStyle = {
  width: '100%',
  padding: '1rem',
  borderRadius: '8px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#FFFFFF',
  fontFamily: 'Inter, sans-serif',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.3s'
};

const contactItemStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1rem'
};

const labelStyle = {
  margin: 0,
  fontSize: '1rem',
  color: '#B0C4DE',
  fontWeight: 500
};

const valueStyle = {
  margin: 0,
  fontSize: '1.125rem',
  color: '#FFFFFF'
};

export default Contact;
