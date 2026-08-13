import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';

const TRIAGE_RULES = [
  {
    keywords: ['boiler', 'hot water', 'radiator', 'pressure', 'cold'],
    title: 'Heating & Hot Water Quick Fix',
    message: 'Before submitting, please check the pressure gauge on the front of your boiler. If it is below 1 bar, you may just need to repressurise it using the filling loop. If radiators are cold at the top, they may need bleeding.',
    icon: '🔥'
  },
  {
    keywords: ['power', 'electric', 'tripped', 'fuse', 'cut'],
    title: 'Check Your Fuse Box',
    message: 'Have you checked your consumer unit (fuse box)? A blown bulb or faulty appliance often trips a switch. Try unplugging all appliances and resetting the switch before raising a ticket.',
    icon: '⚡'
  },
  {
    keywords: ['mould', 'mold', 'damp', 'condensation'],
    title: 'Managing Condensation',
    message: 'Most damp is caused by condensation. Ensure you are ventilating the property (opening windows after showering/cooking), keeping heating on a low constant setting, and use a standard mould spray to wipe affected areas.',
    icon: '💧'
  },
  {
    keywords: ['beeping', 'alarm', 'smoke', 'fire'],
    title: 'Alarm Battery',
    message: 'A continuous short beep usually means the battery is low. Tenants are responsible for replacing batteries in smoke/carbon monoxide alarms. Please replace it with a standard 9V or AA battery.',
    icon: '🔔'
  },
  {
    keywords: ['washing machine', 'smell', 'draining', 'filter'],
    title: 'Appliance Filter Blocked',
    message: 'If your washing machine is not draining or smells, the filter at the bottom front of the machine likely needs emptying. Place a towel down and unscrew the cap to drain the water and remove debris.',
    icon: '🧺'
  },
  {
    keywords: ['toilet', 'blocked', 'sink', 'slow drain', 'plug'],
    title: 'Blocked Pipes',
    message: 'For blocked toilets or slow-draining sinks, please try using a plunger and a standard chemical drain unblocker before we send a plumber. Often this resolves the issue immediately.',
    icon: '🚽'
  }
];

export default function MaintenancePage() {
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [urgency, setUrgency] = useState('Low');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Active triage matching
  const activeTriage = useMemo(() => {
    if (!description.trim()) return null;
    const lowerDesc = description.toLowerCase();
    return TRIAGE_RULES.find(rule => 
      rule.keywords.some(kw => lowerDesc.includes(kw.toLowerCase()))
    );
  }, [description]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div style={{ padding: '8rem 5vw', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          style={{ background: 'var(--color-surface)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)', textAlign: 'center', maxWidth: '500px' }}
        >
          <div style={{ width: '80px', height: '80px', background: '#10b981', borderRadius: '50%', color: '#fff', fontSize: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>✓</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '1rem' }}>Ticket Logged</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
            Your issue at <strong>{address}</strong> has been received. 
            <br/><br/>
            Based on your urgency level ({urgency}), our property management team will respond within {urgency === 'High' ? '4 hours' : urgency === 'Medium' ? '24 hours' : '3 working days'}.
          </p>
          <button onClick={() => { setSubmitted(false); setDescription(''); setAddress(''); }} style={{ padding: '0.8rem 2rem', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '10px', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Report Another Issue</button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Report Maintenance – City Properties Oxford</title>
      </Helmet>

      <section style={{ background: 'linear-gradient(135deg, #0a0a1e 0%, #1a1a3e 100%)', padding: '4rem 5vw 3rem', color: '#fff', textAlign: 'center' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '0.5rem' }}
        >
          Maintenance Portal
        </motion.h1>
        <p style={{ fontFamily: "'Inter', sans-serif", opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
          Report an issue 24/7. Our smart system will help diagnose the problem and alert our contractors immediately if a repair is required.
        </p>
      </section>

      <section style={{ padding: '4rem 5vw', background: 'var(--color-bg)', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '800px', width: '100%' }}>
          
          <form onSubmit={handleSubmit} style={{ background: 'var(--color-surface)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Property Address</label>
              <input 
                required
                type="text" 
                placeholder="E.g. Flat 4, 12 Cowley Road"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', fontFamily: "'Inter', sans-serif", fontSize: '1rem' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Describe the Issue</label>
              <textarea 
                required
                rows={4}
                placeholder="Be as descriptive as possible. E.g. 'My boiler has no hot water and is displaying error code F22.'"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', fontFamily: "'Inter', sans-serif", fontSize: '1rem', resize: 'vertical' }}
              />
            </div>

            {/* AI Triage Alert */}
            <AnimatePresence>
              {activeTriage && (
                <motion.div
                  initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ marginBottom: '1.5rem' }}
                >
                  <div style={{ background: 'rgba(76,87,244,0.08)', border: '1px solid rgba(76,87,244,0.3)', borderRadius: '12px', padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '1.5rem', background: '#fff', padding: '10px', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', flexShrink: 0, width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {activeTriage.icon}
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, color: '#4C57F4', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>AI Suggestion:</span> {activeTriage.title}
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.6 }}>{activeTriage.message}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Urgency</label>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {['Low', 'Medium', 'High'].map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setUrgency(level)}
                    style={{
                      flex: 1, padding: '0.8rem',
                      background: urgency === level ? 'rgba(76,87,244,0.1)' : 'var(--color-bg)',
                      border: urgency === level ? '2px solid #4C57F4' : '1px solid var(--color-border)',
                      color: urgency === level ? '#4C57F4' : 'var(--color-text)',
                      borderRadius: '8px', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontWeight: 600,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {level}
                  </button>
                ))}
              </div>
              {urgency === 'High' && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>* High urgency should only be used for severe leaks, total power loss, or immediate security risks.</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%', padding: '1rem', background: 'linear-gradient(90deg, #4C57F4, #20A6E8)',
                color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1.1rem', fontWeight: 600,
                cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1,
                boxShadow: '0 4px 16px rgba(76,87,244,0.3)', transition: 'all 0.2s ease'
              }}
            >
              {isSubmitting ? 'Logging Ticket...' : 'Submit Maintenance Request'}
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '1rem' }}>
              If this is a severe out-of-hours emergency, please call our 24/7 hotline.
            </p>
          </form>

        </div>
      </section>
    </>
  );
}
