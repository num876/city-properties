import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface PreQualifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle?: string;
}

export default function PreQualifyModal({ isOpen, onClose, propertyTitle }: PreQualifyModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isQualified, setIsQualified] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setAnswers({});
      setIsQualified(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSelect = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    if (step < 4) {
      setStep(s => s + 1);
    } else {
      processAnswers({ ...answers, [key]: value });
    }
  };

  const processAnswers = (finalAnswers: Record<string, string>) => {
    setStep(5); // Calculating state
    
    setTimeout(() => {
      // The strict rule: Must have UK Guarantor or 2.5x income.
      if (finalAnswers.financials === 'No') {
        setIsQualified(false);
      } else {
        setIsQualified(true);
      }
      setStep(6);
    }, 1500);
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
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '2rem', right: '2rem',
            background: 'rgba(255,255,255,0.1)', border: 'none',
            color: '#fff', fontSize: '1.5rem', width: '48px', height: '48px',
            borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        >
          ×
        </button>

        <div style={{ width: '100%', maxWidth: '600px', position: 'relative', minHeight: '400px' }}>
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <StepContainer key="step1">
                <StepSubtitle>Pre-qualification</StepSubtitle>
                <StepTitle>Who is applying?</StepTitle>
                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                  <OptionButton onClick={() => handleSelect('audience', 'Student')}>🎓 Student</OptionButton>
                  <OptionButton onClick={() => handleSelect('audience', 'Professional')}>💼 Professional</OptionButton>
                  <OptionButton onClick={() => handleSelect('audience', 'Corporate')}>🏢 Corporate</OptionButton>
                  <OptionButton onClick={() => handleSelect('audience', 'Family')}>👨‍👩‍👧‍👦 Family</OptionButton>
                </div>
              </StepContainer>
            )}

            {step === 2 && (
              <StepContainer key="step2">
                <StepSubtitle>Pre-qualification</StepSubtitle>
                <StepTitle>When do you need to move in?</StepTitle>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <OptionButton onClick={() => handleSelect('timeline', 'ASAP')}>ASAP</OptionButton>
                  <OptionButton onClick={() => handleSelect('timeline', '<4 weeks')}>Within 4 weeks</OptionButton>
                  <OptionButton onClick={() => handleSelect('timeline', '1-2 months')}>1-2 months</OptionButton>
                  <OptionButton onClick={() => handleSelect('timeline', '3+ months')}>3+ months from now</OptionButton>
                </div>
              </StepContainer>
            )}

            {step === 3 && (
              <StepContainer key="step3">
                <StepSubtitle>Strict Referencing Criteria</StepSubtitle>
                <StepTitle style={{ fontSize: '2rem' }}>Can you provide a UK Guarantor OR prove a combined household income of at least 2.5x the annual rent?</StepTitle>
                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr', marginTop: '2rem' }}>
                  <OptionButton onClick={() => handleSelect('financials', 'Yes')} style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.5)' }}>Yes, I can</OptionButton>
                  <OptionButton onClick={() => handleSelect('financials', 'No')} style={{ background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.5)' }}>No, I cannot</OptionButton>
                </div>
              </StepContainer>
            )}

            {step === 4 && (
              <StepContainer key="step4">
                <StepSubtitle>Pre-qualification</StepSubtitle>
                <StepTitle>Do you have any pets or require parking?</StepTitle>
                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                  <OptionButton onClick={() => handleSelect('requirements', 'None')}>Neither</OptionButton>
                  <OptionButton onClick={() => handleSelect('requirements', 'Pets')}>🐾 Pets</OptionButton>
                  <OptionButton onClick={() => handleSelect('requirements', 'Parking')}>🚗 Parking</OptionButton>
                  <OptionButton onClick={() => handleSelect('requirements', 'Both')}>Both</OptionButton>
                </div>
              </StepContainer>
            )}

            {step === 5 && (
              <StepContainer key="step5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  style={{ width: '50px', height: '50px', border: '4px solid rgba(76,87,244,0.2)', borderTopColor: '#4C57F4', borderRadius: '50%', marginBottom: '2rem' }}
                />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#fff' }}>Checking eligibility...</h3>
              </StepContainer>
            )}

            {step === 6 && (
              <StepContainer key="step6">
                {isQualified ? (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2.5rem', margin: '0 auto 2rem' }}>✓</div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: '#fff', marginBottom: '1rem' }}>You're Pre-qualified!</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                      Great news! Based on your answers, you meet our referencing criteria for {propertyTitle ? <strong>{propertyTitle}</strong> : 'this property'}.
                    </p>
                    <button
                      onClick={() => { onClose(); navigate('/contact'); }}
                      style={{ padding: '1rem 3rem', background: 'linear-gradient(90deg, #4C57F4, #20A6E8)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '1.1rem', fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: 'pointer', boxShadow: '0 4px 20px rgba(76,87,244,0.4)' }}
                    >
                      Continue to Booking
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: 'rgba(239,68,68,0.2)', border: '2px solid #ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontSize: '2.5rem', margin: '0 auto 2rem' }}>!</div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>We're Sorry</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                      Based on your answers, you do not meet our strict financial referencing criteria. All tenants must provide a UK Guarantor or prove an income of 2.5x the rent to proceed with a tenancy at City Properties.
                    </p>
                    <button
                      onClick={onClose}
                      style={{ padding: '1rem 3rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '12px', color: '#fff', fontSize: '1.1rem', fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: 'pointer' }}
                    >
                      Return to Property
                    </button>
                  </div>
                )}
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

// Helpers
function StepContainer({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, position: 'absolute', width: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20, position: 'absolute' }}
      transition={{ duration: 0.3 }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function StepSubtitle({ children }: { children: React.ReactNode }) {
  return <p style={{ color: '#4C57F4', fontFamily: "'Inter', sans-serif", fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', textAlign: 'center', marginBottom: '1rem' }}>{children}</p>;
}

function StepTitle({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) {
  return <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: '#fff', textAlign: 'center', marginBottom: '2.5rem', ...style }}>{children}</h2>;
}

function OptionButton({ children, onClick, style }: { children: React.ReactNode, onClick: () => void, style?: React.CSSProperties }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        padding: '1.25rem', width: '100%',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '14px', color: '#fff', fontFamily: "'Inter', sans-serif",
        fontSize: '1.1rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s ease',
        ...style
      }}
      onMouseOver={e => {
        if (!style) {
          e.currentTarget.style.background = 'rgba(76,87,244,0.15)';
          e.currentTarget.style.borderColor = 'rgba(76,87,244,0.5)';
        }
      }}
      onMouseOut={e => {
        if (!style) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
        }
      }}
    >
      {children}
    </motion.button>
  );
}
