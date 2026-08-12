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

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem',
    fontFamily: "'Inter', sans-serif", border: '1px solid var(--color-border)',
    borderRadius: '10px', background: 'var(--color-surface)', color: 'var(--color-text)',
    outline: 'none', transition: 'border-color 0.2s',
  };

  return (
    <>
      <Helmet>
        <title>Contact – City Properties Oxford</title>
        <meta name="description" content="Get in touch with City Properties for letting and management enquiries in Oxford." />
      </Helmet>

      <section style={{ background: 'linear-gradient(135deg, #4C57F4 0%, #20A6E8 100%)', padding: '3.5rem 5vw 2.5rem', color: '#fff', textAlign: 'center' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '0.5rem' }}
        >
          Get in Touch
        </motion.h1>
        <p style={{ fontFamily: "'Inter', sans-serif", opacity: 0.9 }}>We'd love to hear from you. Our team responds within one business day.</p>
      </section>

      <section style={{ padding: '4rem 5vw', background: 'var(--color-bg)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', maxWidth: '1100px', margin: '0 auto' }}>
          
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: 'var(--color-text)', marginBottom: '1.5rem' }}>Send a Message</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input required name="name" value={form.name} onChange={handleChange} placeholder="Full Name *" style={inputStyle} />
              <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address *" style={inputStyle} />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (optional)" style={inputStyle} />
              <select name="subject" value={form.subject} onChange={handleChange} style={inputStyle}>
                <option value="">Subject</option>
                <option value="letting">Letting Enquiry</option>
                <option value="management">Property Management</option>
                <option value="viewing">Book a Viewing</option>
                <option value="other">Other</option>
              </select>
              <textarea required name="message" value={form.message} onChange={handleChange} placeholder="Your message *" rows={5}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
              <motion.button
                type="submit" disabled={sending}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                style={{
                  padding: '0.9rem 2rem', fontSize: '1rem', fontWeight: 600,
                  background: sending ? '#9ca3af' : 'linear-gradient(90deg,#4C57F4,#20A6E8)',
                  border: 'none', borderRadius: '10px', color: '#fff', cursor: sending ? 'not-allowed' : 'pointer',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {sending ? 'Sending…' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: 'var(--color-text)', marginBottom: '1.5rem' }}>Contact Info</h2>
            {[
              { icon: '📍', label: 'Address', value: '123 High Street, Oxford OX1 1AA' },
              { icon: '📞', label: 'Phone', value: '+44 1865 000 000' },
              { icon: '✉️', label: 'Email', value: 'info@cityproperties-oxford.co.uk' },
              { icon: '🕒', label: 'Hours', value: 'Mon–Fri 9am–6pm, Sat 10am–4pm' },
            ].map((c) => (
              <div key={c.label} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <p style={{ fontWeight: 600, fontFamily: "'Inter', sans-serif", color: 'var(--color-text)', marginBottom: '0.2rem' }}>{c.label}</p>
                  <p style={{ color: 'var(--color-text-muted)', fontFamily: "'Inter', sans-serif", fontSize: '0.95rem' }}>{c.value}</p>
                </div>
              </div>
            ))}
            {/* Map embed */}
            <div style={{ borderRadius: '12px', overflow: 'hidden', marginTop: '1rem', border: '1px solid var(--color-border)' }}>
              <iframe
                title="City Properties Oxford location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2469.6!2d-1.2577!3d51.7520!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876c6a9f0e39a1f%3A0x4a1c1c1c1c1c1c1c!2sOxford%2C+UK!5e0!3m2!1sen!2suk!4v1234567890"
                width="100%" height="220"
                style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </>
  );
}
