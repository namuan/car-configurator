import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useConfigurator, formatPrice } from '../context/ConfiguratorContext'
import { EXTERIOR_COLORS } from '../data/options'
import { DEALERS } from '../data/models'
import CarVisualization from '../components/CarVisualization'

export default function Checkout() {
  const navigate = useNavigate()
  const { state, dispatch, totalPrice } = useConfigurator()

  const [purchaseType, setPurchaseType] = useState<'online' | 'dealer'>('online')
  const [selectedDealer, setSelectedDealer] = useState(DEALERS[0].id)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', postcode: '',
    cardNumber: '', expiry: '', cvv: '', cardName: '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!state.selectedModel) navigate('/models', { replace: true })
  }, [state.selectedModel, navigate])

  if (!state.selectedModel) return null

  const { config } = state
  const model = state.selectedModel
  const colorName = EXTERIOR_COLORS.find(c => c.id === config.exteriorColor)?.name ?? ''

  function handleField(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      const orderNumber = `DYW-${Math.random().toString(36).toUpperCase().slice(2, 8)}`
      dispatch({
        type: 'SET_CHECKOUT_DATA',
        data: { orderNumber, purchaseType, total: totalPrice, contactName: form.firstName, contactEmail: form.email },
      })
      navigate('/thank-you')
    }, 1500)
  }

  return (
    <div className="page">
      {/* Header */}
      <div style={{ background: 'var(--cream-2)', borderBottom: '1px solid var(--border-light)', padding: 'var(--space-7) 0' }}>
        <div className="container">
          <p className="label-sm" style={{ color: 'var(--wine)', marginBottom: 'var(--space-3)' }}>Final Step</p>
          <h1 className="display-md">Complete your order.</h1>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-10)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 'var(--space-8)', alignItems: 'start' }} className="checkout-grid">
          {/* Left — form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>

            {/* Purchase type selector */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 400, marginBottom: 'var(--space-5)', letterSpacing: '-0.01em' }}>
                How would you like to proceed?
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                {([
                  { id: 'online', title: 'Buy Online', sub: 'Complete purchase with card or financing. Car delivered to your door.' },
                  { id: 'dealer', title: 'Reserve at Dealer', sub: 'Pay a deposit now and finalise at your chosen showroom.' },
                ] as const).map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPurchaseType(opt.id)}
                    style={{
                      padding: 'var(--space-5)',
                      border: `2px solid ${purchaseType === opt.id ? 'var(--wine)' : 'var(--border)'}`,
                      background: purchaseType === opt.id ? 'var(--wine-pale)' : 'var(--cream)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s',
                    }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                      <span style={{ fontWeight: 700, fontSize: '14px', color: purchaseType === opt.id ? 'var(--wine)' : 'var(--ink)' }}>{opt.title}</span>
                      <div style={{
                        width: '18px', height: '18px', borderRadius: '50%',
                        border: `2px solid ${purchaseType === opt.id ? 'var(--wine)' : 'var(--border)'}`,
                        background: purchaseType === opt.id ? 'var(--wine)' : 'transparent',
                        flexShrink: 0,
                      }} />
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.5 }}>{opt.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Dealer picker */}
            {purchaseType === 'dealer' && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 400, marginBottom: 'var(--space-5)', letterSpacing: '-0.01em' }}>
                  Select your dealer
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {DEALERS.map(d => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelectedDealer(d.id)}
                      style={{
                        padding: 'var(--space-4) var(--space-5)',
                        border: `1.5px solid ${selectedDealer === d.id ? 'var(--wine)' : 'var(--border-light)'}`,
                        background: selectedDealer === d.id ? 'var(--wine-pale)' : 'var(--cream)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.15s',
                      }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: selectedDealer === d.id ? 'var(--wine)' : 'var(--ink)', marginBottom: '2px' }}>{d.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--ink-3)' }}>{d.address}</div>
                        <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '1px' }}>{d.phone}</div>
                      </div>
                      <span style={{ fontSize: '13px', color: 'var(--wine)', fontWeight: 600, flexShrink: 0 }}>{d.distance}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Contact details */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 400, marginBottom: 'var(--space-5)', letterSpacing: '-0.01em' }}>
                Your details
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <label className="input-label">First Name</label>
                  <input className="input" value={form.firstName} onChange={handleField('firstName')} placeholder="Jane" required />
                </div>
                <div>
                  <label className="input-label">Last Name</label>
                  <input className="input" value={form.lastName} onChange={handleField('lastName')} placeholder="Smith" required />
                </div>
                <div>
                  <label className="input-label">Email Address</label>
                  <input className="input" type="email" value={form.email} onChange={handleField('email')} placeholder="jane@email.com" required />
                </div>
                <div>
                  <label className="input-label">Phone</label>
                  <input className="input" type="tel" value={form.phone} onChange={handleField('phone')} placeholder="+44 7700 000000" />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="input-label">Street Address</label>
                  <input className="input" value={form.address} onChange={handleField('address')} placeholder="123 Example Street" required={purchaseType === 'online'} />
                </div>
                <div>
                  <label className="input-label">City</label>
                  <input className="input" value={form.city} onChange={handleField('city')} placeholder="London" required={purchaseType === 'online'} />
                </div>
                <div>
                  <label className="input-label">Postcode</label>
                  <input className="input" value={form.postcode} onChange={handleField('postcode')} placeholder="EC1A 1BB" required={purchaseType === 'online'} />
                </div>
              </div>
            </div>

            {/* Payment */}
            {purchaseType === 'online' && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 400, marginBottom: 'var(--space-5)', letterSpacing: '-0.01em' }}>
                  Payment
                </h2>
                <div style={{ padding: 'var(--space-5)', background: 'var(--cream-2)', border: '1px solid var(--border-light)', marginBottom: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                    {['VISA', 'MC', 'AMEX'].map(b => (
                      <div key={b} style={{ padding: '4px 10px', border: '1px solid var(--border)', fontSize: '10px', fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '0.05em' }}>{b}</div>
                    ))}
                    <div style={{ padding: '4px 10px', border: '1px solid var(--border)', fontSize: '10px', fontWeight: 700, color: 'var(--ink-3)' }}>🔒 SSL</div>
                  </div>
                  <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
                    <div>
                      <label className="input-label">Card Number</label>
                      <input className="input" value={form.cardNumber} onChange={handleField('cardNumber')} placeholder="1234 5678 9012 3456" maxLength={19} />
                    </div>
                    <div>
                      <label className="input-label">Name on Card</label>
                      <input className="input" value={form.cardName} onChange={handleField('cardName')} placeholder="JANE SMITH" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                      <div>
                        <label className="input-label">Expiry</label>
                        <input className="input" value={form.expiry} onChange={handleField('expiry')} placeholder="MM / YY" maxLength={7} />
                      </div>
                      <div>
                        <label className="input-label">CVV</label>
                        <input className="input" value={form.cvv} onChange={handleField('cvv')} placeholder="•••" maxLength={4} type="password" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit */}
            <div style={{ paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-light)' }}>
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '13px' }}
                disabled={submitting}>
                {submitting ? (
                  'Processing…'
                ) : purchaseType === 'online' ? (
                  `Place Order — ${formatPrice(totalPrice)}`
                ) : (
                  `Reserve with Deposit — ${formatPrice(Math.min(2000, totalPrice * 0.05))}`
                )}
              </button>
              <p style={{ fontSize: '12px', color: 'var(--ink-4)', textAlign: 'center', marginTop: 'var(--space-3)', lineHeight: 1.6 }}>
                By placing your order you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </form>

          {/* Right — order summary */}
          <div style={{ position: 'sticky', top: 'calc(var(--navbar-h) + 24px)' }}>
            <div style={{ background: 'var(--cream-2)', border: '1px solid var(--border-light)', padding: 'var(--space-6)' }}>
              <p className="label-sm" style={{ color: 'var(--ink-3)', marginBottom: 'var(--space-5)' }}>Order Summary</p>

              {/* Mini car preview */}
              <div style={{ background: 'var(--cream)', padding: 'var(--space-4)', marginBottom: 'var(--space-5)', border: '1px solid var(--border-light)' }}>
                <CarVisualization exteriorColorId={config.exteriorColor} wheelsId={config.wheels} roofId={config.roof} />
              </div>

              <div style={{ marginBottom: 'var(--space-5)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400 }}>{model.name}</div>
                <div style={{ fontSize: '13px', color: 'var(--ink-3)', marginTop: '4px' }}>{colorName} · {model.bodyType}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: 'var(--space-5)', borderBottom: '1px solid var(--border)' }}>
                {[
                  { label: 'Base vehicle', amount: model.basePrice },
                  { label: 'Options & accessories', amount: totalPrice - model.basePrice },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: 'var(--ink-3)' }}>{r.label}</span>
                    <span style={{ fontFamily: 'var(--font-display)' }}>{formatPrice(r.amount)}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <span style={{ fontWeight: 600, fontSize: '14px' }}>Total</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: 'var(--wine)' }}>{formatPrice(totalPrice)}</span>
              </div>

              {/* Trust badges */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-light)' }}>
                {['14-day returns', '3-year warranty', 'Free UK delivery', 'No hidden fees'].map(t => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: '12px', color: 'var(--ink-3)' }}>
                    <span style={{ color: 'var(--wine)', fontSize: '10px' }}>✓</span>{t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
