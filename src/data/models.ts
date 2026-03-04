export interface CarSpec {
  engine: string
  power: string
  acceleration: string
  topSpeed: string
  seating: number
  range?: string
  fuelEconomy?: string
}

export interface CarModel {
  id: string
  name: string
  tagline: string
  bodyType: 'Sedan' | 'SUV' | 'Hatchback' | 'GT'
  fuelTypes: ('Petrol' | 'Diesel' | 'Electric' | 'Hybrid')[]
  basePrice: number
  specs: CarSpec
  picsumSeed: string
  highlights: string[]
  badge?: string
}

export const CAR_MODELS: CarModel[] = [
  {
    id: 'velaris',
    name: 'Velaris',
    tagline: 'Precision in every curve',
    bodyType: 'Sedan',
    fuelTypes: ['Petrol', 'Hybrid'],
    basePrice: 42900,
    specs: {
      engine: '2.0L Turbocharged I-4',
      power: '248 hp',
      acceleration: '6.2s',
      topSpeed: '250 km/h',
      seating: 5,
      fuelEconomy: '6.8L/100km',
    },
    picsumSeed: 'velaris-sedan',
    highlights: ['Adaptive cruise control', 'Lane-keeping assist', 'Wireless charging', '10" infotainment'],
    badge: 'Popular',
  },
  {
    id: 'arktos',
    name: 'Arktos',
    tagline: 'Command any terrain',
    bodyType: 'SUV',
    fuelTypes: ['Diesel', 'Hybrid', 'Electric'],
    basePrice: 56500,
    specs: {
      engine: '3.0L V6 Diesel',
      power: '306 hp',
      acceleration: '5.8s',
      topSpeed: '235 km/h',
      seating: 7,
      fuelEconomy: '7.2L/100km',
    },
    picsumSeed: 'arktos-suv',
    highlights: ['7-seat configuration', 'All-wheel drive', 'Panoramic roof', '360° cameras'],
  },
  {
    id: 'lumena',
    name: 'Lumena',
    tagline: 'The future, refined',
    bodyType: 'Sedan',
    fuelTypes: ['Electric'],
    basePrice: 58000,
    specs: {
      engine: 'Dual Electric Motor',
      power: '408 hp',
      acceleration: '4.1s',
      topSpeed: '260 km/h',
      seating: 5,
      range: '520 km',
    },
    picsumSeed: 'lumena-electric',
    highlights: ['520km range', 'Over-the-air updates', 'Autopilot ready', '80% charge in 28min'],
    badge: 'New',
  },
  {
    id: 'crest',
    name: 'Crest',
    tagline: 'Urban agility, reimagined',
    bodyType: 'Hatchback',
    fuelTypes: ['Petrol', 'Hybrid'],
    basePrice: 31200,
    specs: {
      engine: '1.5L Turbocharged',
      power: '168 hp',
      acceleration: '7.8s',
      topSpeed: '220 km/h',
      seating: 5,
      fuelEconomy: '5.4L/100km',
    },
    picsumSeed: 'crest-hatchback',
    highlights: ['Compact urban design', 'Wireless CarPlay', 'Rear camera', 'Smart park assist'],
  },
  {
    id: 'phantom-gt',
    name: 'Phantom GT',
    tagline: 'Pure performance, no compromises',
    bodyType: 'GT',
    fuelTypes: ['Petrol'],
    basePrice: 89000,
    specs: {
      engine: '4.0L Twin-Turbo V8',
      power: '542 hp',
      acceleration: '3.8s',
      topSpeed: '310 km/h',
      seating: 4,
      fuelEconomy: '11.2L/100km',
    },
    picsumSeed: 'phantom-gt',
    highlights: ['Carbon fiber trim', 'Track mode', 'Sport exhaust', 'Brembo brakes'],
    badge: 'Limited',
  },
  {
    id: 'meridian',
    name: 'Meridian',
    tagline: 'Family journeys, elevated',
    bodyType: 'SUV',
    fuelTypes: ['Diesel', 'Hybrid'],
    basePrice: 45500,
    specs: {
      engine: '2.2L Diesel',
      power: '197 hp',
      acceleration: '8.4s',
      topSpeed: '210 km/h',
      seating: 7,
      fuelEconomy: '5.9L/100km',
    },
    picsumSeed: 'meridian-suv',
    highlights: ['3rd row seating', 'Tow capacity 2500kg', 'Family safety package', 'Hands-free tailgate'],
  },
]

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sophia M.',
    role: 'Purchased Velaris Sedan',
    quote: 'The configurator made it effortless to build exactly what I wanted. I could see every change in real time — no surprises at the dealership.',
    picsumSeed: 'reviewer-sophia',
    rating: 5,
  },
  {
    id: 2,
    name: 'James K.',
    role: 'Purchased Arktos SUV',
    quote: 'Finally a car website that doesn\'t make you fill out a form just to see the price. Transparent, beautiful, and genuinely fun to use.',
    picsumSeed: 'reviewer-james',
    rating: 5,
  },
  {
    id: 3,
    name: 'Priya A.',
    role: 'Purchased Lumena Electric',
    quote: 'Configured my Lumena in the evening, sent the spec to my local dealer, and test drove it the next morning. Seamless.',
    picsumSeed: 'reviewer-priya',
    rating: 5,
  },
]

export const DEALERS = [
  { id: 'dl-1', name: 'DriveYourWay Central', address: '145 Motor Row, London EC1A 1BB', phone: '+44 20 7123 4567', distance: '2.1 km' },
  { id: 'dl-2', name: 'DriveYourWay Westside', address: '88 Kensington Ave, London W8 5AF', phone: '+44 20 7234 5678', distance: '4.6 km' },
  { id: 'dl-3', name: 'DriveYourWay Canary Wharf', address: '12 Harbour Sq, London E14 9GE', phone: '+44 20 7345 6789', distance: '7.3 km' },
]
