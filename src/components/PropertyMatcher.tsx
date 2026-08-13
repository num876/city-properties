import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DEMO_PROPERTIES, STUDENT_PROPERTIES } from '../data/properties';
import type { Property } from '../data/properties';

interface PropertyMatcherProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PropertyMatcher({ isOpen, onClose }: PropertyMatcherProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [matches, setMatches] = useState<Property[]>([]);

  const [answers, setAnswers] = useState({
    audience: '',
    budget: '',
    bedrooms: '',
    priority: ''
  });

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setMatches([]);
      setAnswers({ audience: '', budget: '', bedrooms: '', priority: '' });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSelect = (key: keyof typeof answers, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    if (step < 4) {
      setStep(s => s + 1);
    } else {
      calculateMatches({ ...answers, [key]: value });
    }
  };

  const calculateMatches = (finalAnswers: typeof answers) => {
    setStep(5); // calculation step

    setTimeout(() => {
      // Combine all properties
      const allProperties = [...DEMO_PROPERTIES, ...STUDENT_PROPERTIES];

      // Simple scoring algorithm
      const scored = allProperties.map(p => {
        let score = 0;

        // Bedrooms match
        if (finalAnswers.bedrooms === '1' && p.bedrooms === 1) score += 3;
        if (finalAnswers.bedrooms === '2' && p.bedrooms === 2) score += 3;
        if (finalAnswers.bedrooms === '3' && p.bedrooms === 3) score += 3;
        if (finalAnswers.bedrooms === '4+' && (p.bedrooms || 0) >= 4) score += 3;

        // Audience match
        if (finalAnswers.audience === 'Student') {
          if (STUDENT_PROPERTIES.some(sp => sp.id === p.id) || p.type === 'HMO') score += 5;
        } else if (finalAnswers.audience === 'Professional') {
          if (p.type === 'Apartment' || p.type === 'Studio' || p.type === 'Flat' || p.type === 'Penthouse') score += 3;
        } else if (finalAnswers.audience === 'Family') {
          if (p.type === 'House' && !STUDENT_PROPERTIES.some(sp => sp.id === p.id)) score += 4;
        }

        // Budget match (heuristic parsing since price is a string like '£1,850 pcm')
        const priceNum = parseInt((p.price || '0').replace(/[^0-9]/g, ''));
        if (finalAnswers.budget === '<1000' && priceNum > 0 && priceNum < 1000) score += 3;
        if (finalAnswers.budget === '1000-2000' && priceNum >= 1000 && priceNum <= 2000) score += 3;
        if (finalAnswers.budget === '2000+' && priceNum > 2000) score += 3;

        // Priority match
        if (finalAnswers.priority === 'Nightlife' && (p.title.includes('Cowley') || p.title.includes('City Centre'))) score += 2;
        if (finalAnswers.priority === 'Quiet' && (p.title.includes('Marston') || p.title.includes('Headington') || p.title.includes('Jericho'))) score += 2;
        if (finalAnswers.priority === 'Luxury' && (p.type === 'Penthouse' || p.type === 'Apartment')) score += 3;
        if (finalAnswers.priority === 'Near Uni' && (p.title.includes('Cowley') || p.type === 'HMO' || p.title.includes('Headington'))) score += 2;

        return { property: p, score };
      });

      scored.sort((a, b) => b.score - a.score);
      setMatches([scored[0].property, scored[1].property]); // Top 2
      setStep(6); // Results step
    }, 2000); // 2 second dramatic pause
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: 'rgba(10, 10, 30, 0.95)',
          backdropFilter: 'blur(10px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '2rem'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '2rem', right: '2rem',
            background: 'rgba(255,255,255,0.1)', border: 'none',
            color: '#fff', fontSize: '1.5rem', width: '48px', height: '48px',
            borderRadius: '50%', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        >
          ×
        </button>

        <div style={{ width: '100%', maxWidth: '600px', position: 'relative', height: '400px' }}>
          
          {/* STEP 1: Audience */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <StepContainer key="step1">
                <StepTitle>Who are you looking for?</StepTitle>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {['Student', 'Professional', 'Family'].map(opt => (
                    <OptionButton key={opt} onClick={() => handleSelect('audience', opt)}>{opt}</OptionButton>
                  ))}
                </div>
              </StepContainer>
            )}

            {/* STEP 2: Budget */}
            {step === 2 && (
              <StepContainer key="step2">
                <StepTitle>What is your monthly budget?</StepTitle>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <OptionButton onClick={() => handleSelect('budget', '<1000')}>Under £1,000 pcm</OptionButton>
                  <OptionButton onClick={() => handleSelect('budget', '1000-2000')}>£1,000 - £2,000 pcm</OptionButton>
                  <OptionButton onClick={() => handleSelect('budget', '2000+')}>£2,000+ pcm</OptionButton>
                </div>
              </StepContainer>
            )}

            {/* STEP 3: Bedrooms */}
            {step === 3 && (
              <StepContainer key="step3">
                <StepTitle>How many bedrooms do you need?</StepTitle>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {['1', '2', '3', '4+'].map(opt => (
                    <OptionButton key={opt} onClick={() => handleSelect('bedrooms', opt)}>{opt}</OptionButton>
                  ))}
                </div>
              </StepContainer>
            )}

            {/* STEP 4: Priority */}
            {step === 4 && (
              <StepContainer key="step4">
                <StepTitle>What is your top priority?</StepTitle>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <OptionButton onClick={() => handleSelect('priority', 'Nightlife')}>🎉 Vibrant Nightlife</OptionButton>
                  <OptionButton onClick={() => handleSelect('priority', 'Quiet')}>🌳 Quiet & Peaceful</OptionButton>
                  <OptionButton onClick={() => handleSelect('priority', 'Luxury')}>✨ Luxury Finish</OptionButton>
                  <OptionButton onClick={() => handleSelect('priority', 'Near Uni')}>🎓 Close to University</OptionButton>
                </div>
              </StepContainer>
            )}

            {/* STEP 5: Calculating */}
            {step === 5 && (
              <StepContainer key="step5">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  style={{
                    width: '60px', height: '60px', margin: '0 auto 2rem',
                    border: '4px solid rgba(76,87,244,0.2)',
                    borderTopColor: '#4C57F4',
                    borderRadius: '50%'
                  }}
                />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#fff', textAlign: 'center' }}>
                  Finding your perfect match...
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginTop: '1rem', fontFamily: "'Inter', sans-serif" }}>
                  Scanning our exclusive portfolio.
                </p>
              </StepContainer>
            )}

            {/* STEP 6: Results */}
            {step === 6 && (
              <StepContainer key="step6">
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#fff', textAlign: 'center', marginBottom: '2rem' }}>
                  We found your perfect match!
                </h3>
                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr' }}>
                  {matches.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      onClick={() => { onClose(); navigate(`/properties/${p.slug}`); }}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '14px', padding: '1rem',
                        display: 'flex', gap: '1rem', alignItems: 'center',
                        cursor: 'pointer', transition: 'all 0.2s ease',
                      }}
                      onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                      onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    >
                      <img
                        src={p.featuredImage?.node.sourceUrl || 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80'}
                        alt={p.title}
                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                      <div>
                        <h4 style={{ color: '#fff', fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', marginBottom: '0.25rem' }}>{p.title}</h4>
                        <p style={{ color: '#20A6E8', fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: '0.5rem' }}>{p.price}</p>
                        <span style={{ fontSize: '0.8rem', color: '#fff', background: '#4C57F4', padding: '2px 8px', borderRadius: '999px' }}>
                          {i === 0 ? 'Top Match' : 'Great Alternative'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setAnswers({ audience: '', budget: '', bedrooms: '', priority: '' });
                    setStep(1);
                  }}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', marginTop: '2rem', width: '100%', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
                >
                  Start Over
                </button>
              </StepContainer>
            )}
          </AnimatePresence>

          {/* Progress Indicator */}
          {step > 0 && step < 5 && (
            <div style={{ position: 'absolute', bottom: '-4rem', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              {[1, 2, 3, 4].map(s => (
                <div key={s} style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: s === step ? '#4C57F4' : 'rgba(255,255,255,0.2)',
                  transition: 'background 0.3s ease'
                }} />
              ))}
            </div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Helper components for animation and styling
function StepContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, position: 'absolute', width: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, position: 'absolute' }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function StepTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: "'Playfair Display', serif", fontSize: '2.5rem',
      color: '#fff', textAlign: 'center', marginBottom: '2.5rem'
    }}>
      {children}
    </h2>
  );
}

function OptionButton({ children, onClick }: { children: React.ReactNode, onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        padding: '1.25rem', width: '100%',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '14px',
        color: '#fff', fontFamily: "'Inter', sans-serif",
        fontSize: '1.1rem', fontWeight: 500,
        cursor: 'pointer', transition: 'all 0.2s ease',
      }}
      onMouseOver={e => {
        e.currentTarget.style.background = 'rgba(76,87,244,0.15)';
        e.currentTarget.style.borderColor = 'rgba(76,87,244,0.5)';
      }}
      onMouseOut={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
      }}
    >
      {children}
    </motion.button>
  );
}
