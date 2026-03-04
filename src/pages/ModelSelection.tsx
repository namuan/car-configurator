import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CAR_MODELS, CarModel } from '../data/models'
import { useConfigurator, formatPrice } from '../context/ConfiguratorContext'
import Footer from '../components/Footer'

type BodyFilter = 'All' | 'Sedan' | 'SUV' | 'Hatchback' | 'GT'
type FuelFilter = 'All' | 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid'

const MAX_COMPARE = 3

// Shared spec row definitions — used in both desktop table and mobile layout
const SPEC_ROWS: { label: string; key: (m: CarModel) => string }[] = [
  { label: 'Body type',       key: m => m.bodyType },
  { label: 'Fuel',            key: m => m.fuelTypes.join(', ') },
  { label: 'Engine',          key: m => m.specs.engine },
  { label: 'Power',           key: m => m.specs.power },
  { label: '0–100 km/h',      key: m => m.specs.acceleration },
  { label: 'Top speed',       key: m => m.specs.topSpeed },
  { label: 'Seating',         key: m => `${m.specs.seating} seats` },
  { label: 'Range / Economy', key: m => m.specs.range ?? m.specs.fuelEconomy ?? '—' },
]

// 3 distinct brand-aligned accent colours for model identification
const MODEL_ACCENTS = ['#8B1A2B', '#B8956B', '#3A3630'] // wine / gold / charcoal

export default function ModelSelection() {
  const navigate = useNavigate()
  const { dispatch } = useConfigurator()

  const [bodyFilter, setBodyFilter] = useState<BodyFilter>('All')
  const [fuelFilter, setFuelFilter] = useState<FuelFilter>('All')
  const [maxBudget, setMaxBudget] = useState(120000)
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [showCompare, setShowCompare] = useState(false)

  const filtered = useMemo(() => {
    return CAR_MODELS.filter(m => {
      if (bodyFilter !== 'All' && m.bodyType !== bodyFilter) return false
      if (fuelFilter !== 'All' && !m.fuelTypes.includes(fuelFilter as never)) return false
      if (m.basePrice > maxBudget) return false
      return true
    })
  }, [bodyFilter, fuelFilter, maxBudget])

  const compareModels = CAR_MODELS.filter(m => compareIds.includes(m.id))

  function toggleCompare(id: string) {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id)
      if (prev.length >= MAX_COMPARE) return prev
      return [...prev, id]
    })
  }

  function handleSelect(model: CarModel) {
    dispatch({ type: 'SET_MODEL', model })
    navigate('/configure')
  }

  return (
    <div className="page">
      {/* Page header */}
      <div style={{ background: 'var(--cream-2)', borderBottom: '1px solid var(--border-light)', padding: 'var(--space-8) 0 var(--space-6)' }}>
        <div className="container">
          <p className="label-sm" style={{ color: 'var(--wine)', marginBottom: 'var(--space-3)' }}>Current Lineup</p>
          <h1 className="display-lg" style={{ marginBottom: 'var(--space-5)' }}>Choose your model.</h1>
          <p style={{ fontSize: '15px', color: 'var(--ink-3)', fontWeight: 300, maxWidth: '480px', lineHeight: 1.7 }}>
            Select a base model to begin configuring. Every model can be customised with exterior colours, wheels, interior finishes, performance upgrades and more.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: 'var(--cream)', borderBottom: '1px solid var(--border-light)', position: 'sticky', top: 'var(--navbar-h)', zIndex: 10 }}>
        <div className="container" style={{ padding: 'var(--space-4) var(--space-6)', display: 'flex', gap: 'var(--space-6)', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)', flexShrink: 0 }}>Body</span>
            {(['All', 'Sedan', 'SUV', 'Hatchback', 'GT'] as BodyFilter[]).map(f => (
              <button key={f} onClick={() => setBodyFilter(f)} style={{
                padding: '5px 14px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em',
                background: bodyFilter === f ? 'var(--ink)' : 'transparent',
                color: bodyFilter === f ? '#fff' : 'var(--ink-3)',
                border: `1.5px solid ${bodyFilter === f ? 'var(--ink)' : 'var(--border)'}`,
                transition: 'all 0.15s',
              }}>{f}</button>
            ))}
          </div>

          <div style={{ width: '1px', height: '24px', background: 'var(--border)', flexShrink: 0 }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)', flexShrink: 0 }}>Fuel</span>
            {(['All', 'Petrol', 'Diesel', 'Electric', 'Hybrid'] as FuelFilter[]).map(f => (
              <button key={f} onClick={() => setFuelFilter(f)} style={{
                padding: '5px 14px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em',
                background: fuelFilter === f ? 'var(--ink)' : 'transparent',
                color: fuelFilter === f ? '#fff' : 'var(--ink-3)',
                border: `1.5px solid ${fuelFilter === f ? 'var(--ink)' : 'var(--border)'}`,
                transition: 'all 0.15s',
              }}>{f}</button>
            ))}
          </div>

          <div style={{ width: '1px', height: '24px', background: 'var(--border)', flexShrink: 0 }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', minWidth: '220px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)', flexShrink: 0 }}>Max</span>
            <input type="range" min={30000} max={120000} step={5000} value={maxBudget}
              onChange={e => setMaxBudget(Number(e.target.value))}
              style={{ flex: 1, accentColor: 'var(--wine)', cursor: 'pointer' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: 'var(--wine)', minWidth: '70px', fontWeight: 500 }}>
              {formatPrice(maxBudget)}
            </span>
          </div>

          {compareIds.length > 0 && (
            <button className="btn-outline-wine" style={{ marginLeft: 'auto', padding: '7px 18px', fontSize: '11px' }} onClick={() => setShowCompare(true)}>
              Compare ({compareIds.length})
            </button>
          )}
        </div>
      </div>

      {/* Model grid */}
      <div className="container" style={{ padding: 'var(--space-8) var(--space-6)' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-10) 0', color: 'var(--ink-3)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: 'var(--space-4)' }}>No models match your filters.</div>
            <p style={{ fontSize: '14px' }}>Try adjusting the body type, fuel type or budget.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)' }} className="model-select-grid">
            {filtered.map(model => {
              const isCompared = compareIds.includes(model.id)
              return (
                <div key={model.id} style={{
                  background: 'var(--cream-2)', overflow: 'hidden', position: 'relative',
                  border: isCompared ? '2px solid var(--wine)' : '2px solid transparent',
                  transition: 'border-color 0.2s, transform 0.3s var(--ease-out), box-shadow 0.3s',
                }}
                  onMouseEnter={e => { if (!isCompared) { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)' } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}>

                  {model.badge && (
                    <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>
                      <span className={`badge ${model.badge === 'New' ? 'badge-wine' : model.badge === 'Limited' ? 'badge-ink' : 'badge-gold'}`}>{model.badge}</span>
                    </div>
                  )}

                  <div style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 2 }}>
                    <button onClick={() => toggleCompare(model.id)}
                      title={isCompared ? 'Remove from comparison' : compareIds.length >= MAX_COMPARE ? 'Max 3 models' : 'Add to comparison'}
                      style={{
                        width: '30px', height: '30px', borderRadius: '50%',
                        background: isCompared ? 'var(--wine)' : 'rgba(248,245,240,0.9)',
                        border: `1.5px solid ${isCompared ? 'var(--wine)' : 'var(--border)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '16px', lineHeight: 1, color: isCompared ? '#fff' : 'var(--ink-3)',
                        transition: 'all 0.15s',
                        cursor: compareIds.length >= MAX_COMPARE && !isCompared ? 'not-allowed' : 'pointer',
                        opacity: compareIds.length >= MAX_COMPARE && !isCompared ? 0.5 : 1,
                      }}>
                      {isCompared ? '✓' : '+'}
                    </button>
                  </div>

                  <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                    <img src={`https://picsum.photos/seed/${model.picsumSeed}/640/360`} alt={model.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s var(--ease-out)' }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = '')} />
                  </div>

                  <div style={{ padding: 'var(--space-5)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                      <div>
                        <div style={{ fontSize: '11px', color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '3px' }}>
                          {model.bodyType} · {model.fuelTypes.join(' / ')}
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 400, letterSpacing: '-0.01em' }}>{model.name}</h3>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: '11px', color: 'var(--ink-4)' }}>from</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--wine)', fontWeight: 400 }}>{formatPrice(model.basePrice)}</div>
                      </div>
                    </div>

                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontStyle: 'italic', color: 'var(--ink-3)', marginBottom: 'var(--space-5)' }}>
                      {model.tagline}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', padding: 'var(--space-4) 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', marginBottom: 'var(--space-5)' }}>
                      {[
                        { label: 'Power', value: model.specs.power },
                        { label: '0–100', value: model.specs.acceleration },
                        { label: 'Top', value: model.specs.topSpeed.replace(' km/h', '') + '/h' },
                        { label: 'Seats', value: String(model.specs.seating) },
                      ].map(s => (
                        <div key={s.label}>
                          <div style={{ fontSize: '10px', color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.label}</div>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', marginTop: '2px', fontWeight: 400 }}>{s.value}</div>
                        </div>
                      ))}
                    </div>

                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: 'var(--space-5)' }}>
                      {model.highlights.slice(0, 3).map(h => (
                        <li key={h} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--ink-3)' }}>
                          <span style={{ color: 'var(--wine)', fontSize: '10px' }}>●</span>{h}
                        </li>
                      ))}
                    </ul>

                    <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => handleSelect(model)}>
                      Select This Model
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════════════
          COMPARISON MODAL
          Two separate layouts rendered via CSS visibility:
          • .cmp-desktop  — side-by-side table (≥ 640px)
          • .cmp-mobile   — stacked spec blocks  (< 640px)
      ════════════════════════════════════════════════════ */}
      {showCompare && compareModels.length > 0 && (
        <div className="cmp-overlay" onClick={() => setShowCompare(false)}>
          <div className="cmp-sheet" onClick={e => e.stopPropagation()}>

            {/* ── Shared sticky header ── */}
            <div className="cmp-header">
              <div>
                <h2 className="cmp-header-title">Compare models</h2>
                <p className="cmp-header-sub">
                  {compareModels.map((m, i) => (
                    <span key={m.id}>
                      {i > 0 && <span style={{ margin: '0 6px', color: 'var(--border)' }}>·</span>}
                      <span style={{ color: MODEL_ACCENTS[i], fontWeight: 600 }}>{m.name}</span>
                    </span>
                  ))}
                </p>
              </div>
              <button className="cmp-close" onClick={() => setShowCompare(false)} aria-label="Close comparison">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* ──────────────────────────────────────────
                DESKTOP VIEW  (≥ 640px)
                Classic sticky-label-column table
            ────────────────────────────────────────── */}
            <div className="cmp-desktop">
              <div className="cmp-dt-scroll">
                <table className="cmp-dt-table">
                  <thead>
                    <tr>
                      <th className="cmp-dt-label cmp-dt-label-head" />
                      {compareModels.map((m, idx) => (
                        <th key={m.id} className="cmp-dt-model-head">
                          {/* Accent stripe */}
                          <div style={{ height: '3px', background: MODEL_ACCENTS[idx], marginBottom: '14px' }} />
                          <img src={`https://picsum.photos/seed/${m.picsumSeed}/240/135`} alt={m.name} className="cmp-dt-model-img" />
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 400, marginBottom: '3px' }}>{m.name}</div>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: MODEL_ACCENTS[idx] }}>
                            from {formatPrice(m.basePrice)}
                          </div>
                          {m.badge && (
                            <span className={`badge ${m.badge === 'New' ? 'badge-wine' : m.badge === 'Limited' ? 'badge-ink' : 'badge-gold'}`}
                              style={{ marginTop: '8px', display: 'inline-block' }}>
                              {m.badge}
                            </span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SPEC_ROWS.map((row, ri) => (
                      <tr key={ri} className={`cmp-dt-row ${ri % 2 === 1 ? 'cmp-dt-row-tint' : ''}`}>
                        <td className="cmp-dt-label">{row.label}</td>
                        {compareModels.map(m => (
                          <td key={m.id} className="cmp-dt-value">{row.key(m)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="cmp-dt-label" />
                      {compareModels.map(m => (
                        <td key={m.id} className="cmp-dt-cta">
                          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '11px' }}
                            onClick={() => { handleSelect(m); setShowCompare(false) }}>
                            Configure
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* ──────────────────────────────────────────
                MOBILE VIEW  (< 640px)
                Label above → equal-width value columns
                No horizontal scroll required
            ────────────────────────────────────────── */}
            <div className="cmp-mobile">
              {/* Model chips — thumbnails + name + price + remove */}
              <div className="cmp-mb-chips">
                {compareModels.map((m, idx) => (
                  <div key={m.id} className="cmp-mb-chip">
                    {/* Accent top stripe */}
                    <div style={{ height: '3px', background: MODEL_ACCENTS[idx], flexShrink: 0 }} />
                    <div style={{ padding: '10px 10px 12px' }}>
                      <img
                        src={`https://picsum.photos/seed/${m.picsumSeed}/160/90`}
                        alt={m.name}
                        className="cmp-mb-chip-img"
                      />
                      <div className="cmp-mb-chip-name">{m.name}</div>
                      <div className="cmp-mb-chip-price" style={{ color: MODEL_ACCENTS[idx] }}>
                        {formatPrice(m.basePrice)}
                      </div>
                      <button
                        onClick={() => {
                          toggleCompare(m.id)
                          if (compareModels.length <= 1) setShowCompare(false)
                        }}
                        className="cmp-mb-chip-remove"
                        aria-label={`Remove ${m.name} from comparison`}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Spec rows — scrollable */}
              <div className="cmp-mb-specs">
                {SPEC_ROWS.map((row, ri) => (
                  <div key={ri} className={`cmp-mb-spec-block ${ri % 2 === 1 ? 'cmp-mb-spec-tint' : ''}`}>
                    {/* Full-width label */}
                    <div className="cmp-mb-spec-label">{row.label}</div>
                    {/* Values row — equal-width, one per model */}
                    <div className="cmp-mb-spec-values">
                      {compareModels.map((m, idx) => (
                        <div key={m.id} className="cmp-mb-spec-val">
                          {/* Small coloured dot ties value to model chip above */}
                          <span className="cmp-mb-dot" style={{ background: MODEL_ACCENTS[idx] }} />
                          <span className="cmp-mb-val-text">{row.key(m)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sticky CTA footer */}
              <div className="cmp-mb-ctas">
                {compareModels.map(m => (
                  <button key={m.id} className="btn-primary cmp-mb-cta-btn"
                    onClick={() => { handleSelect(m); setShowCompare(false) }}>
                    Configure the {m.name}
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 6.5h9M7 3l3.5 3.5L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      <Footer />

      <style>{`
        /* ── Model grid ───────────────────────────────────── */
        @media (max-width: 900px) { .model-select-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .model-select-grid { grid-template-columns: 1fr !important; } }

        /* ════════════════════════════════════════════════════
           SHARED OVERLAY + SHEET
        ════════════════════════════════════════════════════ */
        .cmp-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(28,25,21,0.72);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .cmp-sheet {
          background: var(--cream);
          width: 100%; max-width: 960px;
          max-height: 90vh;
          display: flex; flex-direction: column;
          overflow: hidden;
        }

        /* ── Shared sticky header ────────────────────────── */
        .cmp-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          padding: 20px 28px 18px;
          border-bottom: 1px solid var(--border-light);
          flex-shrink: 0; background: var(--cream);
        }
        .cmp-header-title {
          font-family: var(--font-display); font-size: 24px; font-weight: 400;
          margin-bottom: 4px;
        }
        .cmp-header-sub { font-size: 13px; color: var(--ink-3); }
        .cmp-close {
          width: 36px; height: 36px; flex-shrink: 0; margin-top: -2px;
          display: flex; align-items: center; justify-content: center;
          color: var(--ink-3); border-radius: 50%;
          transition: background 0.15s, color 0.15s;
        }
        .cmp-close:hover { background: var(--cream-2); color: var(--ink); }

        /* ════════════════════════════════════════════════════
           DESKTOP TABLE (visible ≥ 640px)
        ════════════════════════════════════════════════════ */
        .cmp-desktop { display: flex; flex-direction: column; flex: 1; overflow: hidden; }
        .cmp-mobile  { display: none; }

        .cmp-dt-scroll {
          overflow-x: auto; overflow-y: auto; flex: 1;
          -webkit-overflow-scrolling: touch;
        }
        .cmp-dt-table {
          width: 100%; border-collapse: collapse; min-width: max-content;
        }

        /* Sticky label column */
        .cmp-dt-label {
          position: sticky; left: 0; z-index: 2;
          background: var(--cream);
          width: 118px; min-width: 100px; max-width: 130px;
          padding: 12px 14px 12px 20px;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.07em; text-transform: uppercase; color: var(--ink-3);
          border-top: 1px solid var(--border-light);
          vertical-align: middle;
          box-shadow: 2px 0 6px -3px rgba(28,25,21,0.10);
        }
        .cmp-dt-label-head { border-top: none; }

        .cmp-dt-model-head {
          text-align: center; padding: 0 14px 18px;
          min-width: 160px; vertical-align: top;
          border-bottom: 1px solid var(--border-light);
        }
        .cmp-dt-model-img {
          width: 100%; aspect-ratio: 16/9; object-fit: cover;
          display: block; margin-bottom: 10px;
        }

        .cmp-dt-value {
          text-align: center; padding: 11px 14px;
          font-family: var(--font-display); font-size: 15px;
          color: var(--ink); border-top: 1px solid var(--border-light);
          vertical-align: middle;
        }
        .cmp-dt-row-tint .cmp-dt-value { background: var(--cream-2); }
        .cmp-dt-row-tint .cmp-dt-label { background: var(--cream-2); }

        .cmp-dt-cta {
          padding: 14px 14px 20px; text-align: center;
          border-top: 2px solid var(--border);
        }

        /* ════════════════════════════════════════════════════
           MOBILE LAYOUT (visible < 640px)
           Pattern: label full-width above → equal-width value columns
           No horizontal scrolling ever needed
        ════════════════════════════════════════════════════ */
        @media (max-width: 639px) {
          /* Switch to full-screen bottom sheet */
          .cmp-overlay {
            align-items: flex-end;
            padding: 0;
          }
          .cmp-sheet {
            max-width: 100%;
            max-height: 95vh;
            border-radius: 0;
            border-top: 1px solid var(--border);
          }
          .cmp-header {
            padding: 16px 16px 14px;
          }
          .cmp-header-title { font-size: 20px; }

          /* Hide desktop, show mobile */
          .cmp-desktop { display: none; }
          .cmp-mobile {
            display: flex; flex-direction: column;
            flex: 1; overflow: hidden;
          }

          /* Model chips row */
          .cmp-mb-chips {
            display: flex;
            border-bottom: 1px solid var(--border);
            flex-shrink: 0;
          }
          .cmp-mb-chip {
            flex: 1;
            border-right: 1px solid var(--border-light);
            display: flex; flex-direction: column;
          }
          .cmp-mb-chip:last-child { border-right: none; }
          .cmp-mb-chip-img {
            width: 100%; height: 58px; object-fit: cover;
            display: block; margin-bottom: 6px;
          }
          .cmp-mb-chip-name {
            font-family: var(--font-display); font-size: 14px; font-weight: 400;
            margin-bottom: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          }
          .cmp-mb-chip-price {
            font-family: var(--font-display); font-size: 12px;
            margin-bottom: 6px;
          }
          .cmp-mb-chip-remove {
            font-size: 10px; font-weight: 600; letter-spacing: 0.06em;
            text-transform: uppercase; color: var(--ink-4);
            padding: 0; background: none; border: none;
            cursor: pointer; text-decoration: underline; text-underline-offset: 2px;
            transition: color 0.15s;
          }
          .cmp-mb-chip-remove:hover { color: var(--wine); }

          /* Scrollable spec area */
          .cmp-mb-specs {
            flex: 1; overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }
          .cmp-mb-spec-block {
            padding: 10px 16px;
            border-bottom: 1px solid var(--border-light);
          }
          .cmp-mb-spec-tint { background: var(--cream-2); }

          .cmp-mb-spec-label {
            font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
            text-transform: uppercase; color: var(--ink-3);
            margin-bottom: 6px;
          }
          .cmp-mb-spec-values {
            display: flex; gap: 0;
          }
          .cmp-mb-spec-val {
            /* Each value column gets exactly 1/N of available width */
            flex: 1;
            display: flex; align-items: flex-start; gap: 5px;
            padding-right: 8px;
          }
          .cmp-mb-spec-val:last-child { padding-right: 0; }
          .cmp-mb-dot {
            display: inline-block;
            width: 6px; height: 6px; border-radius: 50%;
            flex-shrink: 0; margin-top: 5px;
          }
          .cmp-mb-val-text {
            font-family: var(--font-display); font-size: 14px;
            color: var(--ink); line-height: 1.3;
            word-break: break-word;
          }

          /* Sticky CTA footer */
          .cmp-mb-ctas {
            display: flex; flex-direction: column; gap: 8px;
            padding: 12px 16px 16px;
            border-top: 1px solid var(--border);
            background: var(--cream);
            flex-shrink: 0;
          }
          .cmp-mb-cta-btn {
            width: 100%; justify-content: space-between !important;
            padding: 13px 16px !important; font-size: 13px !important;
          }
        }

        /* ── Tablet: tighten up the desktop table ─────── */
        @media (min-width: 640px) and (max-width: 900px) {
          .cmp-sheet { max-height: 88vh; }
          .cmp-dt-model-head { min-width: 130px; }
          .cmp-dt-model-img { max-height: 88px; }
        }
      `}</style>
    </div>
  )
}
