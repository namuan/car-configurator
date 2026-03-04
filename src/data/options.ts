export interface ColorOption {
  id: string
  name: string
  hex: string
  finish: 'Solid' | 'Metallic' | 'Matte'
  price: number
}

export interface WheelOption {
  id: string
  name: string
  size: string
  price: number
  rimColor: string
  spokeStyle: 'fivespoke' | 'twinspoke' | 'mesh' | 'star'
}

export interface RoofOption {
  id: string
  name: string
  description: string
  price: number
}

export interface InteriorMaterial {
  id: string
  name: string
  description: string
  price: number
  swatch: string
}

export interface InteriorColor {
  id: string
  name: string
  hex: string
  price: number
}

export interface SeatConfig {
  id: string
  name: string
  description: string
  price: number
}

export interface TechPackage {
  id: string
  name: string
  features: string[]
  price: number
}

export interface EngineOption {
  id: string
  name: string
  power: string
  description: string
  price: number
}

export interface SuspensionOption {
  id: string
  name: string
  description: string
  price: number
}

export interface DrivingModeOption {
  id: string
  name: string
  description: string
  price: number
}

export interface Accessory {
  id: string
  name: string
  category: 'Safety' | 'Comfort' | 'Lifestyle'
  description: string
  price: number
}

export interface UpsellItem {
  id: string
  name: string
  price: number
  description: string
}

export const EXTERIOR_COLORS: ColorOption[] = [
  { id: 'pearl-white', name: 'Pearl White', hex: '#F0EDE6', finish: 'Metallic', price: 0 },
  { id: 'obsidian-black', name: 'Obsidian Black', hex: '#1A1818', finish: 'Metallic', price: 500 },
  { id: 'midnight-blue', name: 'Midnight Blue', hex: '#1B2A4A', finish: 'Metallic', price: 800 },
  { id: 'racing-red', name: 'Racing Red', hex: '#B81B1B', finish: 'Solid', price: 800 },
  { id: 'sage-green', name: 'Sage Green', hex: '#4A6741', finish: 'Metallic', price: 1200 },
  { id: 'desert-sand', name: 'Desert Sand', hex: '#C8A882', finish: 'Solid', price: 600 },
  { id: 'titanium-matte', name: 'Titanium Matte', hex: '#7A7875', finish: 'Matte', price: 2500 },
  { id: 'arctic-silver', name: 'Arctic Silver', hex: '#B0ADA8', finish: 'Metallic', price: 400 },
]

export const WHEEL_OPTIONS: WheelOption[] = [
  { id: 'standard-17', name: 'Standard 17" Alloy', size: '17"', price: 0, rimColor: '#888884', spokeStyle: 'fivespoke' },
  { id: 'sport-18', name: 'Sport 18" Chrome', size: '18"', price: 1200, rimColor: '#C8C8C8', spokeStyle: 'twinspoke' },
  { id: 'performance-19', name: 'Performance 19" Forged', size: '19"', price: 2800, rimColor: '#2A2A2A', spokeStyle: 'mesh' },
  { id: 'premium-20', name: 'Premium 20" Diamond Cut', size: '20"', price: 3500, rimColor: '#D4CFC0', spokeStyle: 'star' },
]

export const ROOF_OPTIONS: RoofOption[] = [
  { id: 'standard', name: 'Standard Roof', description: 'Classic fixed metal roof', price: 0 },
  { id: 'panoramic', name: 'Panoramic Glass', description: 'Extended UV-filtered glass panel', price: 2200 },
  { id: 'contrast-black', name: 'Contrast Black', description: 'Gloss black two-tone sport look', price: 500 },
]

export const INTERIOR_MATERIALS: InteriorMaterial[] = [
  { id: 'premium-fabric', name: 'Premium Fabric', description: 'Durable high-grade woven fabric', price: 0, swatch: '#5A5652' },
  { id: 'sport-leather', name: 'Sport Leather', description: 'Perforated leather with contrast stitching', price: 1800, swatch: '#1A1512' },
  { id: 'nappa-leather', name: 'Nappa Leather', description: 'Full-grain soft-touch leather', price: 3500, swatch: '#2C1810' },
  { id: 'vegan-alcantara', name: 'Vegan Alcantara', description: 'Sustainable premium microsuede', price: 2200, swatch: '#3D3530' },
]

export const INTERIOR_COLORS: InteriorColor[] = [
  { id: 'charcoal', name: 'Charcoal', hex: '#2A2725', price: 0 },
  { id: 'ivory', name: 'Ivory', hex: '#E8E0D0', price: 400 },
  { id: 'bordeaux', name: 'Bordeaux', hex: '#5C1A24', price: 600 },
  { id: 'navy', name: 'Navy', hex: '#1A2440', price: 400 },
]

export const SEAT_CONFIGS: SeatConfig[] = [
  { id: 'standard', name: 'Standard', description: 'Comfort-tuned seating with lumbar support', price: 0 },
  { id: 'heated', name: 'Heated Front', description: '3-level heated front seats', price: 600 },
  { id: 'heated-ventilated', name: 'Heated & Ventilated', description: '3-level heating + ventilation front seats', price: 1400 },
  { id: 'massage', name: 'Massage Suite', description: 'Multi-zone massage + heating + ventilation', price: 2800 },
]

export const TECH_PACKAGES: TechPackage[] = [
  { id: 'standard-tech', name: 'Standard', features: ['8" touchscreen', 'Bluetooth', 'USB-C ports', 'Rear camera'], price: 0 },
  { id: 'connect', name: 'Connect Pack', features: ['10" touchscreen', 'Wireless CarPlay/Android Auto', '4G LTE hotspot', 'Premium speakers'], price: 1600 },
  { id: 'audiophile', name: 'Audiophile Pack', features: ['12" touchscreen', 'Meridian 14-speaker system', 'Head-up display', 'Premium nav'], price: 3200 },
  { id: 'ultimate', name: 'Ultimate Tech', features: ['15" touchscreen', 'Burmester 3D sound', 'Digital cockpit', 'Rear seat entertainment'], price: 5500 },
]

export const ENGINE_OPTIONS: EngineOption[] = [
  { id: 'standard', name: 'Standard', power: 'Factory output', description: 'Balanced performance and efficiency', price: 0 },
  { id: 'sport-tune', name: 'Sport Tune', power: '+50 hp', description: 'ECU remap with sport exhaust system', price: 4500 },
  { id: 'track-spec', name: 'Track Spec', power: '+100 hp', description: 'Full performance hardware upgrade', price: 9000 },
]

export const SUSPENSION_OPTIONS: SuspensionOption[] = [
  { id: 'standard', name: 'Standard', description: 'Factory comfort-tuned suspension', price: 0 },
  { id: 'adaptive', name: 'Adaptive Dampers', description: 'Electronically controlled real-time adjustment', price: 1500 },
  { id: 'sport', name: 'Sport', description: 'Lowered 15mm, stiffer springs for sharper handling', price: 2500 },
]

export const DRIVING_MODES: DrivingModeOption[] = [
  { id: 'standard', name: 'Eco / Comfort / Sport', description: 'Standard three-mode system included', price: 0 },
  { id: 'sport-plus', name: 'Sport+ System', description: 'Adds Track mode with launch control and custom tuning', price: 800 },
]

export const ACCESSORIES: Accessory[] = [
  { id: 'parking-sensors', name: 'Parking Sensors', category: 'Safety', description: 'Front and rear ultrasonic sensors', price: 400 },
  { id: 'camera-360', name: '360° Camera System', category: 'Safety', description: 'Surround-view with bird-eye display', price: 1200 },
  { id: 'blind-spot', name: 'Blind Spot Monitor', category: 'Safety', description: 'Side mirror alerts + rear cross-traffic', price: 650 },
  { id: 'dash-cam', name: 'Integrated Dash Cam', category: 'Safety', description: 'Front + rear with cloud storage', price: 550 },
  { id: 'ambient-lighting', name: 'Ambient Lighting', category: 'Comfort', description: '64-color interior ambient system', price: 600 },
  { id: 'sunroof', name: 'Powered Sunroof', category: 'Comfort', description: 'Tilt and slide with UV protection', price: 1800 },
  { id: 'air-purifier', name: 'Air Purification', category: 'Comfort', description: 'PM2.5 filter with ionizer', price: 450 },
  { id: 'wireless-charge', name: 'Wireless Charging Pad', category: 'Comfort', description: 'Qi-certified fast wireless charging', price: 300 },
  { id: 'bike-rack', name: 'Roof Bike Rack', category: 'Lifestyle', description: 'Carries up to 2 bikes, tool-free mount', price: 350 },
  { id: 'tow-hitch', name: 'Tow Hitch', category: 'Lifestyle', description: 'Detachable, rated to 1500kg', price: 650 },
  { id: 'cargo-liner', name: 'Cargo Liner', category: 'Lifestyle', description: 'Custom-fit waterproof boot liner', price: 180 },
  { id: 'floor-mats', name: 'All-Season Floor Mats', category: 'Lifestyle', description: 'Laser-cut deep-dish all-weather mats', price: 220 },
]

export const UPSELL_ITEMS: UpsellItem[] = [
  { id: 'extended-warranty', name: '5-Year Extended Warranty', price: 2800, description: 'Full mechanical and electrical coverage' },
  { id: 'service-plan', name: '5-Year Service Plan', price: 1600, description: 'Scheduled maintenance prepaid at today\'s rates' },
  { id: 'paint-protection', name: 'Paint Protection Film', price: 1200, description: 'Invisible PPF on all high-impact areas' },
  { id: 'gap-insurance', name: 'GAP Insurance', price: 450, description: 'Covers difference between market value and loan' },
]
