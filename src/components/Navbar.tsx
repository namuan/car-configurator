import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useConfigurator, formatPrice } from '../context/ConfiguratorContext'

export default function Navbar() {
  const location = useLocation()
  const { state, totalPrice } = useConfigurator()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const isConfiguringPath = ['/configure', '/summary', '/checkout'].includes(location.pathname)

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      height: 'var(--navbar-h)',
      zIndex: 100,
      background: scrolled || isConfiguringPath ? 'rgba(248,245,240,0.97)' : 'transparent',
      backdropFilter: scrolled || isConfiguringPath ? 'blur(12px)' : 'none',
      borderBottom: scrolled || isConfiguringPath ? '1px solid var(--border-light)' : '1px solid transparent',
      transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
    }}>
      <div className="container" style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-5)',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'baseline', gap: '1px', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.01em', color: 'var(--ink)' }}>
            Drive
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--wine)' }}>
            Your
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.01em', color: 'var(--ink)' }}>
            Way
          </span>
        </Link>

        {/* Center: model + price when configuring */}
        {isConfiguringPath && state.selectedModel && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flex: 1, justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 500, letterSpacing: '-0.01em' }}>
              {state.selectedModel.name}
            </span>
            <span style={{ color: 'var(--border)' }}>·</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--wine)', fontWeight: 400 }}>
              {formatPrice(totalPrice)}
            </span>
          </div>
        )}

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }} className="desktop-nav">
          <Link to="/models" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-2)', opacity: 0.8, transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}>
            Models
          </Link>
          <Link to="/models" className="btn-primary" style={{ padding: '10px 24px', fontSize: '11px' }}>
            Configure Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: 'var(--space-2)' }}
          className="mobile-menu-btn">
          <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--ink)', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : '' }} />
          <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--ink)', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
          <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--ink)', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : '' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'var(--cream)', borderBottom: '1px solid var(--border)',
          padding: 'var(--space-5) var(--space-4)',
          display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
        }}>
          <Link to="/models" style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Models</Link>
          <Link to="/models" className="btn-primary" style={{ textAlign: 'center', justifyContent: 'center' }}>Configure Now</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
