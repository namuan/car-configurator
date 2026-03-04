import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--cream-2)', paddingTop: 'var(--space-9)', paddingBottom: 'var(--space-7)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 'var(--space-8)', marginBottom: 'var(--space-8)' }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '26px', marginBottom: 'var(--space-4)', letterSpacing: '-0.01em' }}>
              <span style={{ fontWeight: 300, fontStyle: 'italic' }}>Drive</span>
              <span style={{ fontWeight: 600, color: '#C4607A' }}>Your</span>
              <span style={{ fontWeight: 300, fontStyle: 'italic' }}>Way</span>
            </div>
            <p style={{ fontSize: '14px', color: '#A09890', lineHeight: 1.7, maxWidth: '280px' }}>
              The most intuitive car configuration experience. Design your perfect vehicle from the comfort of home.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="label-sm" style={{ color: '#706960', marginBottom: 'var(--space-4)' }}>Explore</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {[
                { to: '/models', label: 'All Models' },
                { to: '/models', label: 'Sedans' },
                { to: '/models', label: 'SUVs' },
                { to: '/models', label: 'Electric' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} style={{ fontSize: '14px', color: '#A09890', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#A09890')}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="label-sm" style={{ color: '#706960', marginBottom: 'var(--space-4)' }}>Support</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {['FAQ', 'Contact Us', 'Find a Dealer', 'Financing'].map(item => (
                <li key={item}>
                  <span style={{ fontSize: '14px', color: '#A09890', cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#A09890')}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="label-sm" style={{ color: '#706960', marginBottom: 'var(--space-4)' }}>Company</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {['About', 'Careers', 'Privacy Policy', 'Terms of Service'].map(item => (
                <li key={item}>
                  <span style={{ fontSize: '14px', color: '#A09890', cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#A09890')}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <p style={{ fontSize: '13px', color: '#706960' }}>
            © 2026 DriveYourWay. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-5)' }}>
            {['Instagram', 'Twitter/X', 'YouTube'].map(s => (
              <span key={s} style={{ fontSize: '13px', color: '#706960', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                onMouseLeave={e => (e.currentTarget.style.color = '#706960')}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: var(--space-7) !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
