import { useMemo } from 'react'
import { EXTERIOR_COLORS, WHEEL_OPTIONS } from '../data/options'

interface Props {
  exteriorColorId: string
  wheelsId: string
  roofId: string
  className?: string
}

type SpokeStyle = 'fivespoke' | 'twinspoke' | 'mesh' | 'star'

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

function lighten(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex)
  const lr = Math.min(255, r + amount)
  const lg = Math.min(255, g + amount)
  const lb = Math.min(255, b + amount)
  return `rgb(${lr},${lg},${lb})`
}

function darken(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex)
  const dr = Math.max(0, r - amount)
  const dg = Math.max(0, g - amount)
  const db = Math.max(0, b - amount)
  return `rgb(${dr},${dg},${db})`
}

interface WheelProps {
  cx: number
  cy: number
  rimColor: string
  spokeStyle: SpokeStyle
  tireR?: number
  rimR?: number
  hubR?: number
}

function Wheel({ cx, cy, rimColor, spokeStyle, tireR = 62, rimR = 46, hubR = 13 }: WheelProps) {
  const spokes = useMemo(() => {
    const items: React.ReactNode[] = []

    if (spokeStyle === 'fivespoke') {
      for (let i = 0; i < 5; i++) {
        const angle = (i * 72 - 90) * (Math.PI / 180)
        const x1 = cx + (hubR + 2) * Math.cos(angle)
        const y1 = cy + (hubR + 2) * Math.sin(angle)
        const x2 = cx + (rimR - 4) * Math.cos(angle)
        const y2 = cy + (rimR - 4) * Math.sin(angle)
        items.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={rimColor} strokeWidth={9} strokeLinecap="round" />)
      }
    } else if (spokeStyle === 'twinspoke') {
      for (let i = 0; i < 5; i++) {
        for (const off of [-0.15, 0.15]) {
          const angle = (i * 72 - 90) * (Math.PI / 180) + off
          const x1 = cx + (hubR + 2) * Math.cos(angle)
          const y1 = cy + (hubR + 2) * Math.sin(angle)
          const x2 = cx + (rimR - 3) * Math.cos(angle)
          const y2 = cy + (rimR - 3) * Math.sin(angle)
          items.push(<line key={`${i}-${off}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={rimColor} strokeWidth={5} strokeLinecap="round" />)
        }
      }
    } else if (spokeStyle === 'mesh') {
      for (let i = 0; i < 14; i++) {
        const angle = (i * (360 / 14) - 90) * (Math.PI / 180)
        const x1 = cx + (hubR + 2) * Math.cos(angle)
        const y1 = cy + (hubR + 2) * Math.sin(angle)
        const x2 = cx + (rimR - 3) * Math.cos(angle)
        const y2 = cy + (rimR - 3) * Math.sin(angle)
        items.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={rimColor} strokeWidth={3.5} strokeLinecap="round" />)
      }
      // inner ring
      items.push(<circle key="inner-ring" cx={cx} cy={cy} r={rimR - 12} fill="none" stroke={rimColor} strokeWidth={2} opacity={0.4} />)
    } else if (spokeStyle === 'star') {
      for (let i = 0; i < 6; i++) {
        const angle = (i * 60 - 90) * (Math.PI / 180)
        const x1 = cx + (hubR + 2) * Math.cos(angle)
        const y1 = cy + (hubR + 2) * Math.sin(angle)
        const x2 = cx + (rimR - 3) * Math.cos(angle)
        const y2 = cy + (rimR - 3) * Math.sin(angle)
        items.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={rimColor} strokeWidth={11} strokeLinecap="round" />)
      }
    }
    return items
  }, [cx, cy, rimColor, spokeStyle, rimR, hubR])

  return (
    <g>
      {/* Tyre shadow */}
      <ellipse cx={cx} cy={cy + tireR - 4} rx={tireR * 0.9} ry={8} fill="rgba(0,0,0,0.18)" />
      {/* Tyre */}
      <circle cx={cx} cy={cy} r={tireR} fill="#1E1C1A" />
      {/* Tyre sidewall highlight */}
      <circle cx={cx} cy={cy} r={tireR - 3} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={5} />
      {/* Rim base */}
      <circle cx={cx} cy={cy} r={rimR} fill="#141312" />
      {/* Rim face */}
      <circle cx={cx} cy={cy} r={rimR - 1} fill={darken(rimColor.startsWith('#') ? rimColor : '#888888', 10)} opacity={0.5} />
      {/* Spokes */}
      {spokes}
      {/* Hub */}
      <circle cx={cx} cy={cy} r={hubR} fill="#141312" />
      <circle cx={cx} cy={cy} r={hubR - 3} fill={rimColor} />
      <circle cx={cx} cy={cy} r={3} fill="#141312" />
    </g>
  )
}

export default function CarVisualization({ exteriorColorId, wheelsId, roofId, className }: Props) {
  const colorOpt = EXTERIOR_COLORS.find(c => c.id === exteriorColorId) ?? EXTERIOR_COLORS[0]
  const wheelOpt = WHEEL_OPTIONS.find(w => w.id === wheelsId) ?? WHEEL_OPTIONS[0]

  const bodyColor = colorOpt.hex
  const bodyHighlight = colorOpt.finish === 'Matte' ? bodyColor : lighten(bodyColor, 28)
  const bodyShadow = darken(bodyColor, 18)
  const isPanoramicRoof = roofId === 'panoramic'
  const isBlackRoof = roofId === 'contrast-black'
  const roofColor = isBlackRoof ? '#1A1818' : bodyColor
  const roofHighlight = isBlackRoof ? '#2A2828' : bodyHighlight

  // Wheel centers
  const FW = { cx: 240, cy: 330 }
  const RW = { cx: 762, cy: 330 }
  const TIRE_R = 62
  const RIM_R = 46

  return (
    <div className={className} style={{ position: 'relative', width: '100%' }}>
      {/* Ground shadow */}
      <svg viewBox="0 0 1000 420" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
        <defs>
          <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.18)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <radialGradient id="bodyShine" cx="45%" cy="30%" r="60%">
            <stop offset="0%" stopColor={bodyHighlight} stopOpacity={colorOpt.finish === 'Matte' ? 0 : 0.7} />
            <stop offset="100%" stopColor={bodyColor} stopOpacity={0} />
          </radialGradient>
          <linearGradient id="roofShine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={roofHighlight} stopOpacity={0.8} />
            <stop offset="50%" stopColor={roofColor} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="hoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={bodyHighlight} stopOpacity={0.5} />
            <stop offset="100%" stopColor={bodyShadow} stopOpacity={0.3} />
          </linearGradient>
          <clipPath id="bodyClip">
            <path d={`
              M 82,330 L 82,300
              C 82,286 90,276 110,273
              L 155,269 C 167,269 175,264 180,256
              L 218,208 C 232,190 255,181 280,179
              L 720,179 C 745,181 768,190 782,208
              L 820,256 C 825,264 833,269 845,269
              L 890,273 C 910,276 918,286 918,300
              L 918,330 L ${RW.cx + TIRE_R},330
              A ${TIRE_R},${TIRE_R} 0 0 0 ${RW.cx - TIRE_R},330
              L ${FW.cx + TIRE_R},330
              A ${TIRE_R},${TIRE_R} 0 0 0 ${FW.cx - TIRE_R},330
              Z
            `} />
          </clipPath>
        </defs>

        {/* Ground shadow ellipse */}
        <ellipse cx={500} cy={396} rx={420} ry={24} fill="url(#groundShadow)" />

        {/* === TYRES (drawn first, behind body) === */}
        <Wheel cx={FW.cx} cy={FW.cy} rimColor={wheelOpt.rimColor} spokeStyle={wheelOpt.spokeStyle} tireR={TIRE_R} rimR={RIM_R} />
        <Wheel cx={RW.cx} cy={RW.cy} rimColor={wheelOpt.rimColor} spokeStyle={wheelOpt.spokeStyle} tireR={TIRE_R} rimR={RIM_R} />

        {/* === CAR BODY === */}
        {/* Main body silhouette */}
        <path
          d={`
            M 82,330 L 82,300
            C 82,286 90,276 110,273
            L 155,269 C 167,269 175,264 180,256
            L 218,208 C 232,190 255,181 280,179
            L 720,179 C 745,181 768,190 782,208
            L 820,256 C 825,264 833,269 845,269
            L 890,273 C 910,276 918,286 918,300
            L 918,330 L ${RW.cx + TIRE_R},330
            A ${TIRE_R},${TIRE_R} 0 0 0 ${RW.cx - TIRE_R},330
            L ${FW.cx + TIRE_R},330
            A ${TIRE_R},${TIRE_R} 0 0 0 ${FW.cx - TIRE_R},330
            Z
          `}
          fill={bodyColor}
          style={{ transition: 'fill 0.5s ease' }}
        />

        {/* Body shine overlay */}
        <path
          d={`
            M 82,330 L 82,300
            C 82,286 90,276 110,273
            L 155,269 C 167,269 175,264 180,256
            L 218,208 C 232,190 255,181 280,179
            L 720,179 C 745,181 768,190 782,208
            L 820,256 C 825,264 833,269 845,269
            L 890,273 C 910,276 918,286 918,300
            L 918,330 L ${RW.cx + TIRE_R},330
            A ${TIRE_R},${TIRE_R} 0 0 0 ${RW.cx - TIRE_R},330
            L ${FW.cx + TIRE_R},330
            A ${TIRE_R},${TIRE_R} 0 0 0 ${FW.cx - TIRE_R},330
            Z
          `}
          fill="url(#bodyShine)"
          style={{ transition: 'all 0.5s ease', pointerEvents: 'none' }}
        />

        {/* Body line (character line running through doors) */}
        <path
          d="M 200,292 C 250,284 680,284 800,290"
          fill="none"
          stroke={bodyShadow}
          strokeWidth={2.5}
          strokeLinecap="round"
          opacity={0.5}
          style={{ transition: 'stroke 0.5s ease' }}
        />

        {/* === ROOF SECTION === */}
        {/* Roof color (may differ for contrast black) */}
        <path
          d="M 280,179 L 720,179 L 772,204 L 228,204 Z"
          fill={roofColor}
          style={{ transition: 'fill 0.5s ease' }}
        />
        <path
          d="M 280,179 L 720,179 L 762,200 L 238,200 Z"
          fill="url(#roofShine)"
          opacity={0.6}
          style={{ transition: 'all 0.5s ease', pointerEvents: 'none' }}
        />

        {/* === WINDOW AREA === */}
        {/* Full window trapezoid */}
        <path
          d="M 232,194 C 244,184 264,180 292,179 L 708,179 C 736,180 756,184 768,194 L 808,262 L 192,262 Z"
          fill={isPanoramicRoof ? 'rgba(140,180,210,0.55)' : 'rgba(110,145,170,0.48)'}
          style={{ transition: 'fill 0.5s ease' }}
        />

        {/* Panoramic roof glass */}
        {isPanoramicRoof && (
          <path
            d="M 310,182 L 690,182 L 720,210 L 280,210 Z"
            fill="rgba(160,210,240,0.5)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={1}
          />
        )}

        {/* Window reflections */}
        <path
          d="M 280,185 L 360,185 L 330,255 L 245,255 Z"
          fill="rgba(255,255,255,0.07)"
        />
        <path
          d="M 560,185 L 640,185 L 660,255 L 575,255 Z"
          fill="rgba(255,255,255,0.05)"
        />

        {/* A pillar */}
        <path
          d="M 268,179 L 295,179 L 240,262 L 218,262 Z"
          fill={bodyColor}
          style={{ transition: 'fill 0.5s ease' }}
        />
        {/* B pillar */}
        <rect x={486} y={179} width={14} height={83} fill={bodyColor} style={{ transition: 'fill 0.5s ease' }} />
        {/* C pillar */}
        <path
          d="M 705,179 L 732,179 L 780,262 L 760,262 Z"
          fill={bodyColor}
          style={{ transition: 'fill 0.5s ease' }}
        />

        {/* Window sill / door frame line */}
        <line x1={195} y1={262} x2={805} y2={262} stroke={bodyShadow} strokeWidth={3} style={{ transition: 'stroke 0.5s ease' }} />

        {/* Door lines */}
        <line x1={295} y1={264} x2={280} y2={328} stroke={bodyShadow} strokeWidth={1.5} opacity={0.6} style={{ transition: 'stroke 0.5s ease' }} />
        <line x1={500} y1={264} x2={500} y2={328} stroke={bodyShadow} strokeWidth={1.5} opacity={0.6} style={{ transition: 'stroke 0.5s ease' }} />
        <line x1={760} y1={264} x2={775} y2={328} stroke={bodyShadow} strokeWidth={1.5} opacity={0.6} style={{ transition: 'stroke 0.5s ease' }} />

        {/* Door handles */}
        <rect x={370} y={290} width={48} height={7} rx={3.5} fill={bodyShadow} opacity={0.5} style={{ transition: 'fill 0.5s ease' }} />
        <rect x={605} y={290} width={48} height={7} rx={3.5} fill={bodyShadow} opacity={0.5} style={{ transition: 'fill 0.5s ease' }} />

        {/* === FRONT DETAILS === */}
        {/* Headlight housing */}
        <path d="M 86,266 L 110,261 L 118,282 L 86,286 Z" fill={darken(bodyColor, 5)} style={{ transition: 'fill 0.5s ease' }} />
        {/* Headlight lens */}
        <path d="M 88,268 L 108,264 L 114,280 L 88,283 Z" fill="rgba(240,248,255,0.92)" />
        {/* DRL strip */}
        <line x1={90} y1={270} x2={112} y2={266} stroke="rgba(255,248,220,0.95)" strokeWidth={2.5} strokeLinecap="round" />
        {/* Front grille */}
        <path d="M 83,298 C 87,288 98,284 112,284 L 150,281 L 148,302 L 82,304 Z" fill={darken(bodyColor, 22)} style={{ transition: 'fill 0.5s ease' }} />
        {/* Grille bars */}
        {[287, 293, 299].map(y => (
          <line key={y} x1={86} y1={y} x2={148} y2={y - 3} stroke="rgba(0,0,0,0.25)" strokeWidth={1.5} />
        ))}

        {/* === REAR DETAILS === */}
        {/* Tail light housing */}
        <path d="M 882,264 L 912,268 L 912,288 L 882,285 Z" fill={darken(bodyColor, 5)} style={{ transition: 'fill 0.5s ease' }} />
        {/* Tail light */}
        <path d="M 884,266 L 910,270 L 910,285 L 884,283 Z" fill="rgba(180,20,20,0.88)" />
        {/* Tail light strip */}
        <line x1={886} y1={268} x2={908} y2={272} stroke="rgba(220,80,80,0.9)" strokeWidth={2.5} strokeLinecap="round" />
        {/* Rear bumper shadow */}
        <path d="M 850,303 L 918,298 L 918,316 L 848,318 Z" fill={darken(bodyColor, 15)} opacity={0.6} style={{ transition: 'fill 0.5s ease' }} />
        {/* Exhaust tips */}
        <ellipse cx={880} cy={322} rx={9} ry={6} fill="#141210" />
        <ellipse cx={878} cy={321} rx={6} ry={4} fill="#262220" />
        <ellipse cx={863} cy={322} rx={7} ry={5} fill="#141210" />

        {/* === FRONT BUMPER === */}
        <path d="M 83,300 L 82,320 L 152,320 L 148,302 Z" fill={darken(bodyColor, 12)} style={{ transition: 'fill 0.5s ease' }} />
        {/* Fog light */}
        <ellipse cx={128} cy={314} rx={11} ry={7} fill="rgba(220,220,180,0.5)" />

        {/* Logo badge center hood */}
        <circle cx={500} cy={184} r={8} fill={darken(bodyColor, 20)} style={{ transition: 'fill 0.5s ease' }} />
        <circle cx={500} cy={184} r={5} fill={lighten(bodyColor, 40)} opacity={0.5} style={{ transition: 'fill 0.5s ease' }} />

        {/* Rear badge */}
        <rect x={488} y={275} width={24} height={9} rx={2} fill={darken(bodyColor, 18)} style={{ transition: 'fill 0.5s ease' }} />
      </svg>
    </div>
  )
}
