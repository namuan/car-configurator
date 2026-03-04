import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useConfigurator, formatPrice } from '../context/ConfiguratorContext'
import CarVisualization from '../components/CarVisualization'
import {
  EXTERIOR_COLORS, WHEEL_OPTIONS, ROOF_OPTIONS,
  INTERIOR_MATERIALS, INTERIOR_COLORS, SEAT_CONFIGS, TECH_PACKAGES,
  ENGINE_OPTIONS, SUSPENSION_OPTIONS, DRIVING_MODES,
  ACCESSORIES, UPSELL_ITEMS,
} from '../data/options'
import { DEALERS } from '../data/models'
import Footer from '../components/Footer'

export default function Summary() {
  const navigate = useNavigate()
  const { state, dispatch, totalPrice, optionPrices } = useConfigurator()

  const [monthlyYears, setMonthlyYears] = useState(48)
  const [deposit, setDeposit] = useState(5000)
  const [upsellSelected, setUpsellSelected] = useState<string[]>([])
  const [showTestDrive, setShowTestDrive] = useState(false)
  const [tdForm, setTdForm] = useState({ name: '', email: '', date: '', dealer: DEALERS[0].id })
  const [tdSubmitted, setTdSubmitted] = useState(false)
  const [showDealers, setShowDealers] = useState(false)

  useEffect(() => {
    if (!state.selectedModel) navigate('/models', { replace: true })
  }, [state.selectedModel, navigate])

  if (!state.selectedModel) return null

  const { config } = state
  const model = state.selectedModel

  const upsellTotal = upsellSelected.reduce((s, id) => s + (UPSELL_ITEMS.find(u => u.id === id)?.price ?? 0), 0)
  const grandTotal = totalPrice + upsellTotal
  const monthlyPayment = Math.round((grandTotal - deposit) / monthlyYears)

  // Helpers
  const label = (opts: { id: string; name: string }[], id: string) => opts.find(o => o.id === id)?.name ?? id

  const configSections = [
    {
      heading: 'Exterior',
      items: [
        { label: 'Colour', value: label(EXTERIOR_COLORS, config.exteriorColor), price: EXTERIOR_COLORS.find(c => c.id === config.exteriorColor)?.price ?? 0 },
        { label: 'Wheels', value: label(WHEEL_OPTIONS, config.wheels), price: WHEEL_OPTIONS.find(w => w.id === config.wheels)?.price ?? 0 },
        { label: 'Roof', value: label(ROOF_OPTIONS, config.roof), price: ROOF_OPTIONS.find(r => r.id === config.roof)?.price ?? 0 },
      ],
    },
    {
      heading: 'Interior',
      items: [
        { label: 'Material', value: label(INTERIOR_MATERIALS, config.interiorMaterial), price: INTERIOR_MATERIALS.find(m => m.id === config.interiorMaterial)?.price ?? 0 },
        { label: 'Colour', value: label(INTERIOR_COLORS, config.interiorColor), price: INTERIOR_COLORS.find(c => c.id === config.interiorColor)?.price ?? 0 },
        { label: 'Seating', value: label(SEAT_CONFIGS, config.seatConfig), price: SEAT_CONFIGS.find(s => s.id === config.seatConfig)?.price ?? 0 },
        { label: 'Technology', value: label(TECH_PACKAGES, config.techPackage), price: TECH_PACKAGES.find(t => t.id === config.techPackage)?.price ?? 0 },
      ],
    },
    {
      heading: 'Performance',
      items: [
        { label: 'Engine', value: label(ENGINE_OPTIONS, config.engine), price: ENGINE_OPTIONS.find(e => e.id === config.engine)?.price ?? 0 },
        { label: 'Suspension', value: label(SUSPENSION_OPTIONS, config.suspension), price: SUSPENSION_OPTIONS.find(s => s.id === config.suspension)?.price ?? 0 },
        { label: 'Driving Modes', value: label(DRIVING_MODES, config.drivingMode), price: DRIVING_MODES.find(d => d.id === config.drivingMode)?.price ?? 0 },
      ],
    },
    {
      heading: 'Accessories',
      items: config.accessories.length > 0
        ? config.accessories.map(id => {
          const a = ACCESSORIES.find(x => x.id === id)
          return { label: a?.category ?? '', value: a?.name ?? id, price: a?.price ?? 0 }
        })
        : [{ label: 'None', value: 'No accessories selected', price: 0 }],
    },
  ]

  return (
    <div className="page">
      {/* Header */}
      <div style={{ background: 'var(--cream-2)', borderBottom: '1px solid var(--border-light)', padding: 'var(--space-7) 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-5)' }}>
            <div>
              <p className="label-sm" style={{ color: 'var(--wine)', marginBottom: 'var(--space-3)' }}>Your Configuration</p>
              <h1 className="display-md">{model.name} — Summary</h1>
            </div>
            <button className="btn-ghost" onClick={() => navigate('/configure')}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Edit configuration
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-10)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 'var(--space-8)', alignItems: 'start' }} className="summary-grid">
          {/* Left column */}
          <div>
            {/* Car preview */}
            <div style={{ background: 'var(--cream-2)', padding: 'var(--space-6)', marginBottom: 'var(--space-8)', border: '1px solid var(--border-light)' }}>
              <CarVisualization exteriorColorId={config.exteriorColor} wheelsId={config.wheels} roofId={config.roof} />
            </div>

            {/* Configuration recap */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 400, marginBottom: 'var(--space-6)', letterSpacing: '-0.01em' }}>
                Your selected options
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {configSections.map(section => (
                  <div key={section.heading}>
                    <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--wine)', marginBottom: 'var(--space-3)' }}>
                      {section.heading}
                    </div>
                    <div style={{ borderTop: '1px solid var(--border-light)' }}>
                      {section.items.map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--border-light)' }}>
                          <div>
                            <span style={{ fontSize: '12px', color: 'var(--ink-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', marginRight: '12px' }}>{item.label}</span>
                            <span style={{ fontSize: '14px', color: 'var(--ink)' }}>{item.value}</span>
                          </div>
                          <span style={{ fontSize: '14px', fontFamily: 'var(--font-display)', color: item.price === 0 ? 'var(--ink-4)' : 'var(--ink)' }}>
                            {item.price === 0 ? 'Included' : `+${formatPrice(item.price)}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upsell */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 400, marginBottom: 'var(--space-3)', letterSpacing: '-0.01em' }}>
                Frequently added
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--ink-3)', marginBottom: 'var(--space-5)' }}>
                Protect your investment with these popular additions.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                {UPSELL_ITEMS.map(u => {
                  const on = upsellSelected.includes(u.id)
                  return (
                    <button
                      key={u.id}
                      onClick={() => setUpsellSelected(prev => on ? prev.filter(i => i !== u.id) : [...prev, u.id])}
                      style={{
                        padding: 'var(--space-4)',
                        border: `1.5px solid ${on ? 'var(--wine)' : 'var(--border-light)'}`,
                        background: on ? 'var(--wine-pale)' : 'var(--cream)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s',
                      }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: on ? 'var(--wine)' : 'var(--ink)' }}>{u.name}</span>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: 'var(--ink)' }}>+{formatPrice(u.price)}</span>
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.5 }}>{u.description}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Dealer / Test drive */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
              {/* Find dealer */}
              <div style={{ padding: 'var(--space-6)', background: 'var(--cream-2)', border: '1px solid var(--border-light)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 400, marginBottom: 'var(--space-4)' }}>Find a Dealer</h3>
                {showDealers ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {DEALERS.map(d => (
                      <div key={d.id} style={{ padding: 'var(--space-3)', background: 'var(--cream)', border: '1px solid var(--border-light)' }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '2px' }}>{d.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--ink-3)' }}>{d.address}</div>
                        <div style={{ fontSize: '12px', color: 'var(--wine)', marginTop: '2px' }}>{d.distance} away</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '11px' }} onClick={() => setShowDealers(true)}>
                    Show Nearby Dealers
                  </button>
                )}
              </div>

              {/* Test drive */}
              <div style={{ padding: 'var(--space-6)', background: 'var(--cream-2)', border: '1px solid var(--border-light)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 400, marginBottom: 'var(--space-4)' }}>Schedule Test Drive</h3>
                {tdSubmitted ? (
                  <div style={{ textAlign: 'center', padding: 'var(--space-5) 0' }}>
                    <div style={{ fontSize: '32px', marginBottom: 'var(--space-3)' }}>✓</div>
                    <p style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Booked! We'll confirm by email.</p>
                  </div>
                ) : showTestDrive ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <div>
                      <label className="input-label">Full Name</label>
                      <input className="input" value={tdForm.name} onChange={e => setTdForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" />
                    </div>
                    <div>
                      <label className="input-label">Email</label>
                      <input className="input" type="email" value={tdForm.email} onChange={e => setTdForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="input-label">Preferred Date</label>
                      <input className="input" type="date" value={tdForm.date} onChange={e => setTdForm(f => ({ ...f, date: e.target.value }))} />
                    </div>
                    <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '11px', marginTop: 'var(--space-2)' }}
                      onClick={() => { if (tdForm.name && tdForm.email) setTdSubmitted(true) }}>
                      Request Test Drive
                    </button>
                  </div>
                ) : (
                  <button className="btn-outline-wine" style={{ width: '100%', justifyContent: 'center', fontSize: '11px' }} onClick={() => setShowTestDrive(true)}>
                    Book Test Drive
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right sticky column — price + CTA */}
          <div style={{ position: 'sticky', top: 'calc(var(--navbar-h) + 24px)' }}>
            <div style={{ background: 'var(--cream-2)', border: '1px solid var(--border-light)', padding: 'var(--space-6)', marginBottom: 'var(--space-5)' }}>
              <p className="label-sm" style={{ color: 'var(--ink-3)', marginBottom: 'var(--space-3)' }}>Price Breakdown</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: 'var(--space-5)', paddingBottom: 'var(--space-5)', borderBottom: '1px solid var(--border)' }}>
                {[
                  { label: 'Base price', amount: model.basePrice },
                  { label: 'Exterior options', amount: optionPrices.exteriorColor + optionPrices.wheels + optionPrices.roof },
                  { label: 'Interior options', amount: optionPrices.interior },
                  { label: 'Performance', amount: optionPrices.performance },
                  { label: 'Accessories', amount: optionPrices.accessories },
                  ...(upsellTotal > 0 ? [{ label: 'Protection & Services', amount: upsellTotal }] : []),
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: 'var(--ink-3)' }}>{row.label}</span>
                    <span style={{ fontFamily: 'var(--font-display)', color: row.amount === 0 ? 'var(--ink-4)' : 'var(--ink)' }}>
                      {row.amount === 0 ? '—' : row.label === 'Base price' ? formatPrice(row.amount) : `+${formatPrice(row.amount)}`}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-6)' }}>
                <div>
                  <div className="label-sm" style={{ marginBottom: '4px' }}>Total (incl. VAT)</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '38px', color: 'var(--wine)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {formatPrice(grandTotal)}
                  </div>
                </div>
              </div>

              {/* Financing */}
              <div style={{ background: 'var(--cream)', border: '1px solid var(--border-light)', padding: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div className="label-sm" style={{ marginBottom: 'var(--space-3)' }}>Finance Calculator</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: 'var(--ink-3)', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>Deposit</span><span style={{ fontFamily: 'var(--font-display)' }}>{formatPrice(deposit)}</span>
                    </label>
                    <input type="range" min={0} max={Math.floor(grandTotal * 0.5)} step={500} value={deposit}
                      onChange={e => setDeposit(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--wine)' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: 'var(--ink-3)', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>Term</span><span>{monthlyYears} months</span>
                    </label>
                    <input type="range" min={24} max={72} step={12} value={monthlyYears}
                      onChange={e => setMonthlyYears(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--wine)' }} />
                  </div>
                </div>
                <div style={{ marginTop: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>Est. monthly</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--wine)' }}>
                    {formatPrice(monthlyPayment)}<span style={{ fontSize: '13px', color: 'var(--ink-3)' }}>/mo</span>
                  </span>
                </div>
                <p style={{ fontSize: '10px', color: 'var(--ink-4)', marginTop: 'var(--space-2)', lineHeight: 1.5 }}>
                  Representative estimate only. Subject to credit approval.
                </p>
              </div>

              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '13px' }}
                onClick={() => navigate('/checkout')}>
                Proceed to Checkout
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-3)', fontSize: '11px' }}
                onClick={() => { dispatch({ type: 'RESET' }); navigate('/') }}>
                Start Over
              </button>
            </div>

            {/* Trust signals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {[
                { icon: '🔒', text: '256-bit SSL encrypted checkout' },
                { icon: '↩', text: '14-day change of mind policy' },
                { icon: '🏅', text: '3-year manufacturer warranty included' },
              ].map(t => (
                <div key={t.text} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: '12px', color: 'var(--ink-3)' }}>
                  <span>{t.icon}</span>
                  <span>{t.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .summary-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
