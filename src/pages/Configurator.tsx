import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useConfigurator, formatPrice } from '../context/ConfiguratorContext'
import CarVisualization from '../components/CarVisualization'
import ProgressBar from '../components/ProgressBar'
import {
  EXTERIOR_COLORS, WHEEL_OPTIONS, ROOF_OPTIONS,
  INTERIOR_MATERIALS, INTERIOR_COLORS, SEAT_CONFIGS, TECH_PACKAGES,
  ENGINE_OPTIONS, SUSPENSION_OPTIONS, DRIVING_MODES,
  ACCESSORIES, Accessory,
} from '../data/options'

const STEPS = [
  { label: 'Exterior', index: 0 },
  { label: 'Interior', index: 1 },
  { label: 'Performance', index: 2 },
  { label: 'Accessories', index: 3 },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400, marginBottom: 'var(--space-5)', letterSpacing: '-0.01em' }}>
      {children}
    </h3>
  )
}

function OptionRow({ selected, onClick, name, description, price }: {
  selected: boolean; onClick: () => void; name: string; description?: string; price: number
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'var(--space-4)',
        background: selected ? 'var(--wine-pale)' : 'var(--cream)',
        border: `1.5px solid ${selected ? 'var(--wine)' : 'var(--border-light)'}`,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.15s',
        gap: 'var(--space-4)',
      }}
      onMouseEnter={e => { if (!selected) e.currentTarget.style.borderColor = 'var(--ink-3)' }}
      onMouseLeave={e => { if (!selected) e.currentTarget.style.borderColor = 'var(--border-light)' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '14px', fontWeight: 600, color: selected ? 'var(--wine)' : 'var(--ink)' }}>{name}</div>
        {description && <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '2px', lineHeight: 1.5 }}>{description}</div>}
      </div>
      <div style={{ flexShrink: 0, textAlign: 'right' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: price === 0 ? 'var(--ink-3)' : 'var(--ink)' }}>
          {price === 0 ? 'Included' : `+${formatPrice(price)}`}
        </div>
      </div>
    </button>
  )
}

export default function Configurator() {
  const navigate = useNavigate()
  const { state, dispatch, totalPrice, optionPrices } = useConfigurator()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!state.selectedModel) navigate('/models', { replace: true })
  }, [state.selectedModel, navigate])

  if (!state.selectedModel) return null

  const { config } = state
  const model = state.selectedModel

  const accessoriesByCategory = ACCESSORIES.reduce<Record<string, Accessory[]>>((acc, a) => {
    if (!acc[a.category]) acc[a.category] = []
    acc[a.category].push(a)
    return acc
  }, {})

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Progress bar header */}
      <div style={{
        borderBottom: '1px solid var(--border-light)',
        background: 'var(--cream)',
        padding: 'var(--space-4) 0',
        flexShrink: 0,
      }}>
        <div className="container">
          <ProgressBar steps={STEPS} currentStep={step} onStepClick={i => i < step && setStep(i)} />
        </div>
      </div>

      {/* Main layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }} className="config-layout">
        {/* Options panel — left */}
        <div style={{
          width: '380px',
          flexShrink: 0,
          borderRight: '1px solid var(--border-light)',
          overflow: 'hidden auto',
          padding: 'var(--space-6)',
          background: 'var(--cream)',
        }} className="options-panel">

          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
              {/* Colour */}
              <div>
                <SectionTitle>Exterior Colour</SectionTitle>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                  {EXTERIOR_COLORS.map(c => (
                    <button
                      key={c.id}
                      title={`${c.name} — ${c.finish}${c.price > 0 ? ` (+${formatPrice(c.price)})` : ''}`}
                      onClick={() => dispatch({ type: 'SET_EXTERIOR_COLOR', id: c.id })}
                      style={{
                        width: '36px', height: '36px',
                        borderRadius: '50%',
                        background: c.hex,
                        border: `3px solid ${config.exteriorColor === c.id ? 'var(--wine)' : 'transparent'}`,
                        outline: `1.5px solid ${config.exteriorColor === c.id ? 'var(--wine)' : '#ccc'}`,
                        outlineOffset: '2px',
                        cursor: 'pointer',
                        transition: 'transform 0.15s, border-color 0.15s',
                        transform: config.exteriorColor === c.id ? 'scale(1.1)' : 'scale(1)',
                        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
                      }} />
                  ))}
                </div>
                {/* Selected color info */}
                {(() => {
                  const sel = EXTERIOR_COLORS.find(c => c.id === config.exteriorColor)
                  return sel ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', background: 'var(--cream-2)', fontSize: '13px' }}>
                      <span style={{ fontWeight: 600 }}>{sel.name}</span>
                      <span style={{ color: 'var(--ink-3)' }}>{sel.finish} · {sel.price === 0 ? 'Included' : `+${formatPrice(sel.price)}`}</span>
                    </div>
                  ) : null
                })()}
              </div>

              {/* Wheels */}
              <div>
                <SectionTitle>Wheels</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {WHEEL_OPTIONS.map(w => (
                    <OptionRow key={w.id} selected={config.wheels === w.id} onClick={() => dispatch({ type: 'SET_WHEELS', id: w.id })}
                      name={w.name} description={`${w.size} alloy`} price={w.price} />
                  ))}
                </div>
              </div>

              {/* Roof */}
              <div>
                <SectionTitle>Roof</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {ROOF_OPTIONS.map(r => (
                    <OptionRow key={r.id} selected={config.roof === r.id} onClick={() => dispatch({ type: 'SET_ROOF', id: r.id })}
                      name={r.name} description={r.description} price={r.price} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
              {/* Interior Material */}
              <div>
                <SectionTitle>Interior Material</SectionTitle>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                  {INTERIOR_MATERIALS.map(m => (
                    <button
                      key={m.id}
                      title={m.name}
                      onClick={() => dispatch({ type: 'SET_INTERIOR_MATERIAL', id: m.id })}
                      style={{
                        width: '44px', height: '44px',
                        background: m.swatch,
                        border: `3px solid ${config.interiorMaterial === m.id ? 'var(--wine)' : 'transparent'}`,
                        outline: `1.5px solid ${config.interiorMaterial === m.id ? 'var(--wine)' : '#ccc'}`,
                        outlineOffset: '2px',
                        cursor: 'pointer',
                        transition: 'transform 0.15s',
                        transform: config.interiorMaterial === m.id ? 'scale(1.1)' : 'scale(1)',
                      }} />
                  ))}
                </div>
                {(() => {
                  const sel = INTERIOR_MATERIALS.find(m => m.id === config.interiorMaterial)
                  return sel ? (
                    <div style={{ padding: 'var(--space-3) var(--space-4)', background: 'var(--cream-2)', fontSize: '13px' }}>
                      <div style={{ fontWeight: 600, marginBottom: '2px' }}>{sel.name}</div>
                      <div style={{ color: 'var(--ink-3)' }}>{sel.description} · {sel.price === 0 ? 'Included' : `+${formatPrice(sel.price)}`}</div>
                    </div>
                  ) : null
                })()}
              </div>

              {/* Interior Colour */}
              <div>
                <SectionTitle>Interior Colour</SectionTitle>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                  {INTERIOR_COLORS.map(c => (
                    <button
                      key={c.id}
                      title={c.name}
                      onClick={() => dispatch({ type: 'SET_INTERIOR_COLOR', id: c.id })}
                      style={{
                        width: '36px', height: '36px',
                        borderRadius: '50%',
                        background: c.hex,
                        border: `3px solid ${config.interiorColor === c.id ? 'var(--wine)' : 'transparent'}`,
                        outline: `1.5px solid ${config.interiorColor === c.id ? 'var(--wine)' : '#ccc'}`,
                        outlineOffset: '2px',
                        cursor: 'pointer',
                        transition: 'transform 0.15s',
                        transform: config.interiorColor === c.id ? 'scale(1.1)' : 'scale(1)',
                        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)',
                      }} />
                  ))}
                </div>
              </div>

              {/* Seating */}
              <div>
                <SectionTitle>Seating</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {SEAT_CONFIGS.map(s => (
                    <OptionRow key={s.id} selected={config.seatConfig === s.id} onClick={() => dispatch({ type: 'SET_SEAT_CONFIG', id: s.id })}
                      name={s.name} description={s.description} price={s.price} />
                  ))}
                </div>
              </div>

              {/* Technology */}
              <div>
                <SectionTitle>Technology Package</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {TECH_PACKAGES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => dispatch({ type: 'SET_TECH_PACKAGE', id: t.id })}
                      style={{
                        width: '100%',
                        padding: 'var(--space-4)',
                        background: config.techPackage === t.id ? 'var(--wine-pale)' : 'var(--cream)',
                        border: `1.5px solid ${config.techPackage === t.id ? 'var(--wine)' : 'var(--border-light)'}`,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s',
                      }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: config.techPackage === t.id ? 'var(--wine)' : 'var(--ink)' }}>{t.name}</span>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: 'var(--ink-3)' }}>
                          {t.price === 0 ? 'Included' : `+${formatPrice(t.price)}`}
                        </span>
                      </div>
                      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px' }}>
                        {t.features.map(f => (
                          <li key={f} style={{ fontSize: '11px', color: 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ color: 'var(--wine)', fontSize: '8px' }}>●</span>{f}
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
              <div>
                <SectionTitle>Engine</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {ENGINE_OPTIONS.map(e => (
                    <OptionRow key={e.id} selected={config.engine === e.id} onClick={() => dispatch({ type: 'SET_ENGINE', id: e.id })}
                      name={`${e.name} ${e.power !== 'Factory output' ? `(${e.power})` : ''}`} description={e.description} price={e.price} />
                  ))}
                </div>
              </div>

              <div>
                <SectionTitle>Suspension</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {SUSPENSION_OPTIONS.map(s => (
                    <OptionRow key={s.id} selected={config.suspension === s.id} onClick={() => dispatch({ type: 'SET_SUSPENSION', id: s.id })}
                      name={s.name} description={s.description} price={s.price} />
                  ))}
                </div>
              </div>

              <div>
                <SectionTitle>Driving Modes</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {DRIVING_MODES.map(d => (
                    <OptionRow key={d.id} selected={config.drivingMode === d.id} onClick={() => dispatch({ type: 'SET_DRIVING_MODE', id: d.id })}
                      name={d.name} description={d.description} price={d.price} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
              {(['Safety', 'Comfort', 'Lifestyle'] as const).map(cat => (
                <div key={cat}>
                  <SectionTitle>{cat}</SectionTitle>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    {(accessoriesByCategory[cat] ?? []).map(a => {
                      const isOn = config.accessories.includes(a.id)
                      return (
                        <button
                          key={a.id}
                          onClick={() => dispatch({ type: 'TOGGLE_ACCESSORY', id: a.id })}
                          style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 'var(--space-4)',
                            background: isOn ? 'var(--wine-pale)' : 'var(--cream)',
                            border: `1.5px solid ${isOn ? 'var(--wine)' : 'var(--border-light)'}`,
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.15s',
                            gap: 'var(--space-4)',
                          }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: isOn ? 'var(--wine)' : 'var(--ink)' }}>{a.name}</div>
                            <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '2px' }}>{a.description}</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: 'var(--ink)' }}>+{formatPrice(a.price)}</span>
                            <div style={{
                              width: '20px', height: '20px',
                              borderRadius: '50%',
                              background: isOn ? 'var(--wine)' : 'transparent',
                              border: `1.5px solid ${isOn ? 'var(--wine)' : 'var(--border)'}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              flexShrink: 0,
                              transition: 'all 0.15s',
                            }}>
                              {isOn && (
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                  <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right panel — car viz + price */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--cream-2)' }}>
          {/* Car visualization */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)', overflow: 'hidden' }}>
            <div style={{ width: '100%', maxWidth: '680px' }}>
              <CarVisualization
                exteriorColorId={config.exteriorColor}
                wheelsId={config.wheels}
                roofId={config.roof}
              />
            </div>
          </div>

          {/* Price sidebar (bottom) */}
          <div style={{ borderTop: '1px solid var(--border)', background: 'var(--cream)', padding: 'var(--space-5) var(--space-6)', flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-4)' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {model.name} — Total
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: 'var(--wine)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {formatPrice(totalPrice)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                {step > 0 && (
                  <button className="btn-secondary" style={{ padding: '10px 24px', fontSize: '11px' }} onClick={() => setStep(s => s - 1)}>
                    Back
                  </button>
                )}
                {step < STEPS.length - 1 ? (
                  <button className="btn-primary" style={{ padding: '10px 28px', fontSize: '11px' }} onClick={() => setStep(s => s + 1)}>
                    Next: {STEPS[step + 1].label}
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 6.5h9M7 3l3.5 3.5L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ) : (
                  <button className="btn-primary" style={{ padding: '10px 28px', fontSize: '11px' }} onClick={() => navigate('/summary')}>
                    Review Summary
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 6.5h9M7 3l3.5 3.5L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Price breakdown mini */}
            <div style={{ display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
              {[
                { label: 'Base price', value: model.basePrice },
                { label: 'Exterior', value: optionPrices.exteriorColor + optionPrices.wheels + optionPrices.roof },
                { label: 'Interior', value: optionPrices.interior },
                { label: 'Performance', value: optionPrices.performance },
                { label: 'Accessories', value: optionPrices.accessories },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '10px', color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' }}>{item.label}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: item.value === 0 ? 'var(--ink-4)' : 'var(--ink)', marginTop: '2px' }}>
                    {item.value === 0 ? '—' : item.label === 'Base price' ? formatPrice(item.value) : `+${formatPrice(item.value)}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .config-layout { flex-direction: column !important; overflow: visible !important; height: auto !important; }
          .options-panel { width: 100% !important; border-right: none !important; border-bottom: 1px solid var(--border-light); max-height: 50vh; overflow-y: auto; }
        }
      `}</style>
    </div>
  )
}
