import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Toast from '../components/Toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' as const });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    setToast({ visible: true, message: 'Message sent! We will be in touch shortly.', type: 'success' });
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <>
      <Helmet>
        <title>Contact – City Properties Oxford</title>
        <meta name="description" content="Get in touch with City Properties for letting and management enquiries in Oxford." />
      </Helmet>

      {/* Cinematic Hero Header */}
      <section style={{ 
        position: 'relative',
        width: '100%',
        height: '45vh',
        minHeight: '350px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5vw',
        overflow: 'hidden'
      }}>
        {/* Background Image & Gradient */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img 
            src="/images/demo_riverside_flat.jpg" 
            alt="Oxford city skyline"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,10,30,0.85) 0%, rgba(10,10,30,0.4) 100%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', marginBottom: '0.75rem', lineHeight: 1.1 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: "'Inter', sans-serif", opacity: 0.9, fontSize: '1.15rem', color: '#fff', maxWidth: '600px' }}
          >
            Whether you're looking for your perfect Oxford home, or need unparalleled property management, our team is ready to help.
          </motion.p>
        </div>
      </section>

      {/* Contact Content Split */}
      <section style={{ padding: '6rem 5vw 8rem', background: 'var(--color-bg)', position: 'relative' }}>
        {/* Background decorative blurs */}
        <div style={{ position: 'absolute', top: 0, left: '-10%', width: '600px', height: '600px', background: 'rgba(76,87,244,0.06)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, right: '-10%', width: '600px', height: '600px', background: 'rgba(32,166,232,0.06)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="contact-grid">
            
            {/* Left side: Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '24px',
                padding: '3rem',
                boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
              }}
            >
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>Send a Message</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>
                Fill out the form below and a member of our team will get back to you within one business day.
              </p>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                  <input required name="name" value={form.name} onChange={handleChange} placeholder="Full Name *" className="premium-input" />
                  <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address *" className="premium-input" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (optional)" className="premium-input" />
                  <select required name="subject" value={form.subject} onChange={handleChange} className="premium-input" style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto' }}>
                    <option value="" disabled>Subject *</option>
                    <option value="letting">Letting Enquiry</option>
                    <option value="management">Property Management</option>
                    <option value="viewing">Book a Viewing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <textarea required name="message" value={form.message} onChange={handleChange} placeholder="How can we help you? *" rows={5} className="premium-input" style={{ resize: 'vertical' }} />
                
                <motion.button
                  type="submit" disabled={sending}
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(76,87,244,0.3)' }} whileTap={{ scale: 0.98 }}
                  style={{
                    marginTop: '0.5rem', padding: '1.1rem 2.5rem', fontSize: '1.05rem', fontWeight: 600,
                    background: sending ? '#9ca3af' : 'linear-gradient(90deg,#4C57F4,#20A6E8)',
                    border: 'none', borderRadius: '12px', color: '#fff', cursor: sending ? 'not-allowed' : 'pointer',
                    fontFamily: "'Inter', sans-serif", transition: 'box-shadow 0.2s ease', alignSelf: 'flex-start'
                  }}
                >
                  {sending ? 'Sending Message…' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>

            {/* Right side: Info */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
            >
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: 'var(--color-text)', marginBottom: '2rem' }}>Contact Info</h2>
                {[
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />, 
                    dot: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />,
                    label: 'Office Location', value: '123 High Street, Oxford OX1 1AA' 
                  },
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                    label: 'Phone Line', value: '+44 1865 000 000' 
                  },
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                    label: 'Email Address', value: 'info@cityproperties-oxford.co.uk' 
                  },
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
                    label: 'Opening Hours', value: 'Mon–Fri: 9am–6pm, Sat: 10am–4pm' 
                  },
                ].map((c) => (
                  <div key={c.label} style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.75rem', alignItems: 'flex-start' }}>
                    <div style={{ 
                      width: '48px', height: '48px', flexShrink: 0, borderRadius: '50%',
                      background: 'rgba(76,87,244,0.1)', color: '#4C57F4',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {c.icon}
                        {c.dot}
                      </svg>
                    </div>
                    <div style={{ paddingTop: '2px' }}>
                      <p style={{ fontWeight: 600, fontFamily: "'Inter', sans-serif", color: 'var(--color-text)', marginBottom: '0.2rem', fontSize: '1.05rem' }}>{c.label}</p>
                      <p style={{ color: 'var(--color-text-muted)', fontFamily: "'Inter', sans-serif", fontSize: '0.95rem' }}>{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map embed */}
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', height: '280px' }}>
                <iframe
                  title="City Properties Oxford location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2469.6!2d-1.2577!3d51.7520!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876c6a9f0e39a1f%3A0x4a1c1c1c1c1c1c1c!2sOxford%2C+UK!5e0!3m2!1sen!2suk!4v1234567890"
                  width="100%" height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen loading="lazy"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />

      <style>{`
        .premium-input {
          width: 100%;
          padding: 1rem 1.25rem;
          font-size: 0.95rem;
          font-family: 'Inter', sans-serif;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          color: var(--color-text);
          outline: none;
          transition: all 0.25s ease;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
        }
        [data-theme='dark'] .premium-input {
          background: rgba(0,0,0,0.2);
        }
        .premium-input:focus {
          border-color: #4C57F4;
          box-shadow: 0 0 0 3px rgba(76,87,244,0.15);
        }
        .premium-input::placeholder {
          color: var(--color-text-muted);
          opacity: 0.7;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
        }
        
        @media (min-width: 900px) {
          .contact-grid {
            grid-template-columns: 1.2fr 0.8fr;
          }
        }
      `}</style>
    </>
  );
}
