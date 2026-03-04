interface Step {
  label: string
  index: number
}

interface Props {
  steps: Step[]
  currentStep: number
  onStepClick?: (index: number) => void
}

export default function ProgressBar({ steps, currentStep, onStepClick }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {steps.map((step, i) => {
        const done = i < currentStep
        const active = i === currentStep
        return (
          <div key={step.index} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
            {/* Step node */}
            <button
              onClick={() => done && onStepClick?.(i)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                cursor: done ? 'pointer' : 'default',
                padding: '0 4px',
                flexShrink: 0,
              }}>
              {/* Circle */}
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: done ? 'var(--wine)' : active ? 'var(--ink)' : 'transparent',
                border: `1.5px solid ${done ? 'var(--wine)' : active ? 'var(--ink)' : 'var(--border)'}`,
                transition: 'all 0.25s ease',
                fontSize: '11px',
                fontWeight: 700,
                color: done || active ? '#fff' : 'var(--ink-4)',
              }}>
                {done ? (
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path d="M1 4.5L4 7.5L10 1.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
              {/* Label */}
              <span style={{
                fontSize: '10px',
                fontWeight: active ? 700 : 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: active ? 'var(--ink)' : done ? 'var(--wine)' : 'var(--ink-4)',
                whiteSpace: 'nowrap',
                transition: 'color 0.25s ease',
              }}>
                {step.label}
              </span>
            </button>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div style={{
                flex: 1,
                height: '1.5px',
                background: done ? 'var(--wine)' : 'var(--border)',
                marginBottom: '20px',
                transition: 'background 0.35s ease',
                minWidth: '20px',
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}
