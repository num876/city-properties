import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import IconFeature from '../components/IconFeature';
import Toast from '../components/Toast';

const BENEFITS = [
  { icon: '💷', title: 'Maximise Your Yield', body: 'Our expert team ensures your property achieves market-leading rental returns.' },
  { icon: '🛡', title: 'Fully Insured Management', body: 'All managed properties are covered by our comprehensive landlord protection scheme.' },
  { icon: '⚡', title: 'Fast Tenant Placement', body: 'On average we find quality tenants within 14 days of listing your property.' },
  { icon: '📊', title: 'Monthly Reporting', body: 'Transparent financial reporting with itemised statements delivered every month.' },
  { icon: '🔧', title: 'Maintenance Network', body: 'Access to our vetted network of local tradespeople at preferred rates.' },
  { icon: '📋', title: 'Legal Compliance', body: 'We keep your property fully compliant with all current UK letting legislation.' },
];

export default function LandlordsPage() {
  const [form, setForm] = useState({ name: '', email: '', postcode: '', message: '' });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' as const });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setSending(false);
    setToast({ visible: true, message: 'Valuation request received! We will call you within 24 hours.', type: 'success' });
    setForm({ name: '', email: '', postcode: '', message: '' });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem',
    fontFamily: "'Inter', sans-serif", border: '1px solid var(--color-border)',
    borderRadius: '10px', background: 'var(--color-surface)', color: 'var(--color-text)', outline: 'none',
  };

  return (
    <>
      <Helmet>
        <title>Landlords – City Properties Oxford</title>
        <meta name="description" content="Let and manage your Oxford property with City Properties. Free valuations available." />
      </Helmet>

      <section style={{ background: 'linear-gradient(135deg, #4C57F4 0%, #20A6E8 100%)', padding: '4rem 5vw 3rem', color: '#fff', textAlign: 'center' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1rem' }}
        >
          Landlord Services
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', opacity: 0.9, maxWidth: '560px', margin: '0 auto 2rem' }}
        >
          Let your Oxford property with confidence. Trusted management from Oxford's leading letting agency.
        </motion.p>
      </section>

      {/* Benefits */}
      <section style={{ padding: '5rem 5vw', background: 'var(--color-bg)' }}>
        <h2 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--color-text)', marginBottom: '3rem' }}>Why Let With Us</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
          {BENEFITS.map((b) => <IconFeature key={b.title} icon={b.icon} title={b.title} body={b.body} />)}
        </div>
      </section>

      {/* Free Valuation */}
      <section style={{ padding: '5rem 5vw', background: 'linear-gradient(135deg, #f8f9ff 0%, #eef2ff 100%)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--color-text)', marginBottom: '0.75rem' }}>Request a Free Valuation</h2>
          <p style={{ color: 'var(--color-text-muted)', fontFamily: "'Inter', sans-serif", fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.7 }}>
            Find out how much your Oxford property could achieve in today's rental market.
          </p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <input required name="name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Full Name *" style={inputStyle} />
            <input required type="email" name="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="Email Address *" style={inputStyle} />
            <input required name="postcode" value={form.postcode} onChange={(e) => setForm((f) => ({ ...f, postcode: e.target.value }))} placeholder="Property Postcode *" style={inputStyle} />
            <textarea name="message" value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} placeholder="Additional notes (optional)" rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
            <motion.button type="submit" disabled={sending} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              style={{ padding: '0.9rem 2rem', fontSize: '1rem', fontWeight: 600, background: sending ? '#9ca3af' : 'linear-gradient(90deg,#4C57F4,#20A6E8)', border: 'none', borderRadius: '10px', color: '#fff', cursor: sending ? 'not-allowed' : 'pointer', fontFamily: "'Inter', sans-serif" }}
            >
              {sending ? 'Sending…' : 'Request Free Valuation'}
            </motion.button>
          </form>
        </div>
      </section>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </>
  );
}
