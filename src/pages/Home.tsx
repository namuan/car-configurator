import { useNavigate } from 'react-router-dom'
import { CAR_MODELS, TESTIMONIALS } from '../data/models'
import { useConfigurator } from '../context/ConfiguratorContext'
import { formatPrice } from '../context/ConfiguratorContext'
import Footer from '../components/Footer'

const FEATURES = [
  { num: '01', title: 'Live Visualisation', body: 'Every choice you make updates the car instantly. See exactly what you\'re getting before you commit.' },
  { num: '02', title: 'Transparent Pricing', body: 'No hidden fees. Every option shows its price clearly, with a running total updated in real time.' },
  { num: '03', title: 'Save & Return', body: 'Create an account to save your configuration and pick up where you left off on any device.' },
  { num: '04', title: 'Dealer Handoff', body: 'Send your spec directly to a dealer, schedule a test drive, or reserve online in minutes.' },
]

export default function Home() {
  const navigate = useNavigate()
  const { dispatch } = useConfigurator()

  function handleModelConfigure(model: typeof CAR_MODELS[0]) {
    dispatch({ type: 'SET_MODEL', model })
    navigate('/configure')
  }

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'var(--navbar-h)',
      }} className="hero-grid">
        {/* Left */}
        <div style={{ padding: 'var(--space-9) var(--space-8) var(--space-9) max(48px, calc((100vw - 1280px) / 2 + 32px))' }}>
          <p className="label-sm anim-fade-up" style={{ marginBottom: 'var(--space-5)', color: 'var(--wine)' }}>
            The Configurator
          </p>
          <h1 className="display-xl anim-fade-up anim-delay-1" style={{ marginBottom: 'var(--space-6)', color: 'var(--ink)' }}>
            Design the<br />
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--wine)' }}>car you've</em><br />
            always imagined.
          </h1>
          <p className="anim-fade-up anim-delay-2" style={{ fontSize: '16px', color: 'var(--ink-3)', lineHeight: 1.75, maxWidth: '400px', marginBottom: 'var(--space-7)', fontWeight: 300 }}>
            Choose your model, select every option, see the price update live, and hand off to a dealer — all from one seamless experience.
          </p>
          <div className="anim-fade-up anim-delay-3" style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="btn-primary" onClick={() => navigate('/models')} style={{ fontSize: '13px', padding: '16px 40px' }}>
              Start Building
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="btn-secondary" onClick={() => navigate('/models')}>
              Explore Models
            </button>
          </div>

          {/* Stats row */}
          <div className="anim-fade-up anim-delay-4" style={{ display: 'flex', gap: 'var(--space-7)', marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border-light)' }}>
            {[{ v: '6', l: 'Models Available' }, { v: '50+', l: 'Combinations' }, { v: '4.9', l: 'Average Rating' }].map(s => (
              <div key={s.l}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 400, color: 'var(--ink)', lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '4px', fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — hero image */}
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
          <img
            src="https://picsum.photos/seed/hero-car-dark/900/1200"
            alt="Luxury car"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, var(--cream) 0%, transparent 25%, transparent 75%, rgba(248,245,240,0.4) 100%)',
          }} />
          {/* Floating pill */}
          <div style={{
            position: 'absolute', bottom: '48px', right: '48px',
            background: 'rgba(248,245,240,0.92)', backdropFilter: 'blur(12px)',
            border: '1px solid var(--border)', padding: '16px 24px',
            display: 'flex', alignItems: 'center', gap: '16px',
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--wine)', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Now Configuring</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginTop: '2px' }}>Phantom GT — Track Edition</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <section style={{ padding: 'var(--space-10) 0', background: 'var(--cream-2)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-9)', flexWrap: 'wrap', gap: 'var(--space-5)' }}>
            <h2 className="display-lg" style={{ maxWidth: '400px' }}>
              Built for people who care about <em style={{ fontStyle: 'italic', color: 'var(--wine)' }}>every detail</em>.
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--ink-3)', maxWidth: '320px', lineHeight: 1.75, fontWeight: 300 }}>
              We built the tool we always wished existed — transparent, visual, and genuinely useful.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-1)' }} className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={f.num} style={{
                padding: 'var(--space-7) var(--space-6)',
                background: i % 2 === 1 ? 'var(--ink)' : 'var(--cream)',
                color: i % 2 === 1 ? 'var(--cream)' : 'var(--ink)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '64px',
                  fontWeight: 300,
                  lineHeight: 1,
                  color: i % 2 === 1 ? 'rgba(248,245,240,0.15)' : 'var(--border)',
                  marginBottom: 'var(--space-6)',
                }}>
                  {f.num}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400, marginBottom: 'var(--space-4)', letterSpacing: '-0.01em' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.75, color: i % 2 === 1 ? 'rgba(248,245,240,0.65)' : 'var(--ink-3)', fontWeight: 300 }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODEL SHOWCASE ────────────────────────────────── */}
      <section style={{ padding: 'var(--space-10) 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div>
              <p className="label-sm" style={{ marginBottom: 'var(--space-3)', color: 'var(--wine)' }}>Current Lineup</p>
              <h2 className="display-md">Six models. Infinite possibilities.</h2>
            </div>
            <button className="btn-ghost" onClick={() => navigate('/models')}>
              View all models
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)' }} className="models-grid">
            {CAR_MODELS.map(model => (
              <div
                key={model.id}
                style={{
                  background: 'var(--cream-2)',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'transform 0.3s var(--ease-out), box-shadow 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.boxShadow = ''
                }}
                onClick={() => handleModelConfigure(model)}>

                {model.badge && (
                  <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 2 }}>
                    <span className={`badge ${model.badge === 'New' ? 'badge-wine' : model.badge === 'Limited' ? 'badge-ink' : 'badge-gold'}`}>
                      {model.badge}
                    </span>
                  </div>
                )}

                {/* Car image */}
                <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={`https://picsum.photos/seed/${model.picsumSeed}/640/360`}
                    alt={model.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s var(--ease-out)' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = '')}
                  />
                </div>

                {/* Card body */}
                <div style={{ padding: 'var(--space-5) var(--space-5) var(--space-6)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: '4px' }}>
                        <span className="label-sm" style={{ color: 'var(--ink-4)' }}>{model.bodyType}</span>
                        <span style={{ color: 'var(--border)', fontSize: '12px' }}>·</span>
                        <span className="label-sm" style={{ color: 'var(--ink-4)' }}>{model.fuelTypes.join(' / ')}</span>
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 400, letterSpacing: '-0.01em' }}>
                        {model.name}
                      </h3>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginBottom: '2px' }}>from</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--wine)' }}>
                        {formatPrice(model.basePrice)}
                      </div>
                    </div>
                  </div>

                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: 'var(--ink-3)', marginBottom: 'var(--space-5)', fontStyle: 'italic' }}>
                    {model.tagline}
                  </p>

                  <div style={{ display: 'flex', gap: 'var(--space-5)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-light)' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Power</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', marginTop: '2px' }}>{model.specs.power}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>0–100</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', marginTop: '2px' }}>{model.specs.acceleration}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Seats</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', marginTop: '2px' }}>{model.specs.seating}</div>
                    </div>
                  </div>

                  <button
                    className="btn-ghost"
                    style={{ marginTop: 'var(--space-5)', width: '100%', justifyContent: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-4)' }}>
                    Configure this model
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section style={{ padding: 'var(--space-10) 0', background: 'var(--cream-2)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-9)' }}>
            <p className="label-sm" style={{ marginBottom: 'var(--space-3)', color: 'var(--wine)' }}>Real Customers</p>
            <h2 className="display-md">What our drivers say.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)' }} className="testimonials-grid">
            {TESTIMONIALS.map(t => (
              <div key={t.id} style={{ padding: 'var(--space-7)', background: 'var(--cream)', position: 'relative' }}>
                {/* Quote mark */}
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '80px', lineHeight: 1, color: 'var(--border)', position: 'absolute', top: '24px', left: '32px', userSelect: 'none' }}>
                  "
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Stars */}
                  <div style={{ color: 'var(--gold)', letterSpacing: '2px', marginBottom: 'var(--space-5)', fontSize: '14px' }}>
                    {'★'.repeat(t.rating)}
                  </div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 400, lineHeight: 1.65, color: 'var(--ink)', marginBottom: 'var(--space-6)', fontStyle: 'italic' }}>
                    {t.quote}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <img
                      src={`https://picsum.photos/seed/${t.picsumSeed}/80/80`}
                      alt={t.name}
                      style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{t.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '2px' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section style={{ background: 'var(--wine)', padding: 'var(--space-9) 0', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', right: '-80px', top: '-40px', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', right: '100px', bottom: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <p className="label-sm" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 'var(--space-4)' }}>Ready?</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 300, color: '#fff', marginBottom: 'var(--space-6)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Your perfect car is<br /><em style={{ fontStyle: 'italic', fontWeight: 300 }}>waiting to be built.</em>
          </h2>
          <button
            className="btn-secondary"
            style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff', padding: '16px 48px', fontSize: '13px' }}
            onClick={() => navigate('/models')}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'transparent' }}>
            Choose Your Model
          </button>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr 1fr !important; }
          .models-grid { grid-template-columns: 1fr 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .models-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
