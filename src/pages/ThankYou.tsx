import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useConfigurator, formatPrice } from '../context/ConfiguratorContext'
import CarVisualization from '../components/CarVisualization'
import Footer from '../components/Footer'

export default function ThankYou() {
  const navigate = useNavigate()
  const { state, dispatch } = useConfigurator()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [confetti, setConfetti] = useState(true)

  useEffect(() => {
    if (!state.checkoutData) navigate('/', { replace: true })
    const t = setTimeout(() => setConfetti(false), 3000)
    return () => clearTimeout(t)
  }, [state.checkoutData, navigate])

  if (!state.checkoutData || !state.selectedModel) return null

  const { checkoutData, config, selectedModel: model } = state

  const nextSteps = [
    {
      icon: '📧',
      title: 'Check your email',
      body: `A confirmation has been sent to ${checkoutData.contactEmail || 'your email'}.`,
    },
    {
      icon: '🚗',
      title: checkoutData.purchaseType === 'dealer' ? 'Visit the showroom' : 'Track your delivery',
      body: checkoutData.purchaseType === 'dealer'
        ? 'Our dealer will contact you within 24 hours to arrange your appointment.'
        : 'Your vehicle will be produced and delivered. Estimated arrival: 6–10 weeks.',
    },
    {
      icon: '🔧',
      title: 'Set up your account',
      body: 'Access your car\'s digital manual, maintenance schedule, and over-the-air updates.',
    },
  ]

  return (
    <div className="page">
      {/* Confetti overlay */}
      {confetti && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, pointerEvents: 'none', overflow: 'hidden' }}>
          {Array.from({ length: 40 }, (_, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: '-20px',
              width: `${Math.random() * 10 + 6}px`,
              height: `${Math.random() * 10 + 6}px`,
              background: ['#8B1A2B', '#C4935A', '#1C1915', '#B0ADA8'][Math.floor(Math.random() * 4)],
              borderRadius: Math.random() > 0.5 ? '50%' : '0',
              animation: `fall ${Math.random() * 2 + 1.5}s linear ${Math.random() * 1.5}s forwards`,
              opacity: Math.random() * 0.8 + 0.2,
            }} />
          ))}
        </div>
      )}

      {/* Hero banner */}
      <div style={{ background: 'var(--ink)', padding: 'var(--space-9) 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'rgba(139,26,43,0.12)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(60px, 10vw, 120px)', lineHeight: 1, color: 'rgba(248,245,240,0.08)', fontWeight: 300, marginBottom: '-20px', userSelect: 'none' }}>
            ✓
          </div>
          <div style={{ fontSize: '52px', marginBottom: 'var(--space-4)' }}>🎉</div>
          <p className="label-sm" style={{ color: 'rgba(248,245,240,0.5)', marginBottom: 'var(--space-4)' }}>
            Order Confirmed
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 300, color: '#fff', marginBottom: 'var(--space-4)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Your <em style={{ fontStyle: 'italic', color: '#C4607A' }}>{model.name}</em><br />is on its way.
          </h1>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)', background: 'rgba(248,245,240,0.08)', border: '1px solid rgba(248,245,240,0.15)', padding: '12px 24px', marginTop: 'var(--space-3)' }}>
            <span style={{ fontSize: '12px', color: 'rgba(248,245,240,0.6)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Order</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#fff', letterSpacing: '0.05em' }}>{checkoutData.orderNumber}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--space-9)', paddingBottom: 'var(--space-10)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 'var(--space-8)', alignItems: 'start' }} className="ty-grid">
          {/* Left */}
          <div>
            {/* Car preview */}
            <div style={{ background: 'var(--cream-2)', padding: 'var(--space-7)', marginBottom: 'var(--space-8)', border: '1px solid var(--border-light)' }}>
              <div style={{ marginBottom: 'var(--space-5)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <p className="label-sm" style={{ color: 'var(--wine)', marginBottom: 'var(--space-2)' }}>Your configured vehicle</p>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 400, letterSpacing: '-0.01em' }}>{model.name}</h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginBottom: '2px' }}>Total paid</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--wine)' }}>{formatPrice(checkoutData.total)}</div>
                </div>
              </div>
              <CarVisualization exteriorColorId={config.exteriorColor} wheelsId={config.wheels} roofId={config.roof} />
            </div>

            {/* Next steps */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 400, marginBottom: 'var(--space-6)', letterSpacing: '-0.01em' }}>
                What happens next?
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid var(--border-light)' }}>
                {nextSteps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 'var(--space-5)', padding: 'var(--space-5) 0', borderBottom: '1px solid var(--border-light)', alignItems: 'flex-start' }}>
                    <div style={{ width: '44px', height: '44px', background: 'var(--cream-2)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                      {step.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>{step.title}</div>
                      <div style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.6 }}>{step.body}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--border)', fontWeight: 300, flexShrink: 0, lineHeight: 1 }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social share */}
            <div style={{ padding: 'var(--space-6)', background: 'var(--cream-2)', border: '1px solid var(--border-light)', marginBottom: 'var(--space-7)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400, marginBottom: 'var(--space-3)' }}>
                Share your configuration
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-3)', marginBottom: 'var(--space-5)' }}>
                Let everyone know what you've built.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                {['Twitter/X', 'Instagram', 'WhatsApp', 'Copy Link'].map(platform => (
                  <button
                    key={platform}
                    style={{
                      padding: '9px 16px',
                      border: '1.5px solid var(--border)',
                      background: 'var(--cream)',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--ink-2)',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s, background 0.15s',
                      letterSpacing: '0.05em',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.background = 'var(--cream-2)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--cream)' }}>
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback */}
            <div style={{ padding: 'var(--space-6)', background: 'var(--cream-2)', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400, marginBottom: 'var(--space-2)' }}>
                How was your experience?
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', marginBottom: 'var(--space-4)' }}>Your feedback helps us improve DriveYourWay.</p>

              {feedbackSent ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-5)' }}>
                  <div style={{ fontSize: '28px', marginBottom: 'var(--space-3)' }}>🙏</div>
                  <p style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Thank you for your feedback!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {/* Star rating */}
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '32px',
                          cursor: 'pointer',
                          color: (hoverRating || rating) >= star ? 'var(--gold)' : 'var(--border)',
                          transition: 'color 0.1s, transform 0.1s',
                          transform: (hoverRating || rating) >= star ? 'scale(1.15)' : 'scale(1)',
                          padding: '0 2px',
                        }}>
                        ★
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={feedbackText}
                    onChange={e => setFeedbackText(e.target.value)}
                    placeholder="Tell us about your experience (optional)…"
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1.5px solid var(--border)',
                      background: 'var(--cream)',
                      fontSize: '14px',
                      fontFamily: 'var(--font-body)',
                      resize: 'vertical',
                      outline: 'none',
                      color: 'var(--ink)',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'var(--ink-2)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                  <button
                    className="btn-primary"
                    style={{ alignSelf: 'flex-start', padding: '12px 28px', fontSize: '11px' }}
                    onClick={() => rating > 0 && setFeedbackSent(true)}
                    disabled={rating === 0}>
                    Submit Feedback
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right */}
          <div style={{ position: 'sticky', top: 'calc(var(--navbar-h) + 24px)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {/* Order card */}
            <div style={{ background: 'var(--cream-2)', border: '1px solid var(--border-light)', padding: 'var(--space-6)' }}>
              <p className="label-sm" style={{ marginBottom: 'var(--space-4)', color: 'var(--ink-3)' }}>Order Details</p>
              {[
                { label: 'Order Number', value: checkoutData.orderNumber },
                { label: 'Type', value: checkoutData.purchaseType === 'online' ? 'Online Purchase' : 'Dealer Reservation' },
                { label: 'Model', value: model.name },
                { label: 'Body', value: model.bodyType },
                { label: 'Total', value: formatPrice(checkoutData.total) },
                { label: 'Est. Delivery', value: checkoutData.purchaseType === 'online' ? '6–10 weeks' : 'At dealer' },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-light)', fontSize: '13px' }}>
                  <span style={{ color: 'var(--ink-3)' }}>{row.label}</span>
                  <span style={{ fontWeight: 600, fontFamily: row.label === 'Order Number' || row.label === 'Total' ? 'var(--font-display)' : 'inherit', color: row.label === 'Total' ? 'var(--wine)' : 'var(--ink)' }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '12px' }}>
                Track Your Order
              </button>
              <Link to="/models" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
                Explore More Models
              </Link>
              <button
                style={{ fontSize: '12px', color: 'var(--ink-3)', padding: '8px', textAlign: 'center', cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'underline' }}
                onClick={() => { dispatch({ type: 'RESET' }); navigate('/') }}>
                Return to home
              </button>
            </div>

            {/* Explore accessories promo */}
            <div style={{ padding: 'var(--space-5)', background: 'var(--gold-pale)', border: '1px solid rgba(196,147,90,0.3)' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', marginBottom: 'var(--space-2)' }}>Explore accessories</p>
              <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.5, marginBottom: 'var(--space-4)' }}>
                Floor mats, seat covers, roof boxes and more — officially approved for your {model.name}.
              </p>
              <button className="btn-ghost" style={{ fontSize: '11px' }}>
                Shop accessories
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes fall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @media (max-width: 900px) {
          .ty-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
