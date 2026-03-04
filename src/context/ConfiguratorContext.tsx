import { createContext, useContext, useReducer, useMemo, ReactNode } from 'react'
import { CarModel } from '../data/models'
import {
  EXTERIOR_COLORS, WHEEL_OPTIONS, ROOF_OPTIONS,
  INTERIOR_MATERIALS, INTERIOR_COLORS, SEAT_CONFIGS,
  TECH_PACKAGES, ENGINE_OPTIONS, SUSPENSION_OPTIONS,
  DRIVING_MODES, ACCESSORIES,
} from '../data/options'

export interface Configuration {
  exteriorColor: string
  wheels: string
  roof: string
  interiorMaterial: string
  interiorColor: string
  seatConfig: string
  techPackage: string
  engine: string
  suspension: string
  drivingMode: string
  accessories: string[]
}

export interface CheckoutData {
  orderNumber: string
  purchaseType: 'online' | 'dealer'
  total: number
  contactName: string
  contactEmail: string
}

interface ConfiguratorState {
  selectedModel: CarModel | null
  config: Configuration
  checkoutData: CheckoutData | null
}

type Action =
  | { type: 'SET_MODEL'; model: CarModel }
  | { type: 'SET_EXTERIOR_COLOR'; id: string }
  | { type: 'SET_WHEELS'; id: string }
  | { type: 'SET_ROOF'; id: string }
  | { type: 'SET_INTERIOR_MATERIAL'; id: string }
  | { type: 'SET_INTERIOR_COLOR'; id: string }
  | { type: 'SET_SEAT_CONFIG'; id: string }
  | { type: 'SET_TECH_PACKAGE'; id: string }
  | { type: 'SET_ENGINE'; id: string }
  | { type: 'SET_SUSPENSION'; id: string }
  | { type: 'SET_DRIVING_MODE'; id: string }
  | { type: 'TOGGLE_ACCESSORY'; id: string }
  | { type: 'SET_CHECKOUT_DATA'; data: CheckoutData }
  | { type: 'RESET' }

const DEFAULT_CONFIG: Configuration = {
  exteriorColor: 'pearl-white',
  wheels: 'standard-17',
  roof: 'standard',
  interiorMaterial: 'premium-fabric',
  interiorColor: 'charcoal',
  seatConfig: 'standard',
  techPackage: 'standard-tech',
  engine: 'standard',
  suspension: 'standard',
  drivingMode: 'standard',
  accessories: [],
}

const INITIAL_STATE: ConfiguratorState = {
  selectedModel: null,
  config: DEFAULT_CONFIG,
  checkoutData: null,
}

function reducer(state: ConfiguratorState, action: Action): ConfiguratorState {
  switch (action.type) {
    case 'SET_MODEL':
      return { ...state, selectedModel: action.model, config: DEFAULT_CONFIG }
    case 'SET_EXTERIOR_COLOR':
      return { ...state, config: { ...state.config, exteriorColor: action.id } }
    case 'SET_WHEELS':
      return { ...state, config: { ...state.config, wheels: action.id } }
    case 'SET_ROOF':
      return { ...state, config: { ...state.config, roof: action.id } }
    case 'SET_INTERIOR_MATERIAL':
      return { ...state, config: { ...state.config, interiorMaterial: action.id } }
    case 'SET_INTERIOR_COLOR':
      return { ...state, config: { ...state.config, interiorColor: action.id } }
    case 'SET_SEAT_CONFIG':
      return { ...state, config: { ...state.config, seatConfig: action.id } }
    case 'SET_TECH_PACKAGE':
      return { ...state, config: { ...state.config, techPackage: action.id } }
    case 'SET_ENGINE':
      return { ...state, config: { ...state.config, engine: action.id } }
    case 'SET_SUSPENSION':
      return { ...state, config: { ...state.config, suspension: action.id } }
    case 'SET_DRIVING_MODE':
      return { ...state, config: { ...state.config, drivingMode: action.id } }
    case 'TOGGLE_ACCESSORY': {
      const has = state.config.accessories.includes(action.id)
      return {
        ...state,
        config: {
          ...state.config,
          accessories: has
            ? state.config.accessories.filter(a => a !== action.id)
            : [...state.config.accessories, action.id],
        },
      }
    }
    case 'SET_CHECKOUT_DATA':
      return { ...state, checkoutData: action.data }
    case 'RESET':
      return INITIAL_STATE
    default:
      return state
  }
}

interface OptionPrices {
  exteriorColor: number
  wheels: number
  roof: number
  interior: number
  performance: number
  accessories: number
}

interface ConfiguratorContextValue {
  state: ConfiguratorState
  dispatch: React.Dispatch<Action>
  totalPrice: number
  optionPrices: OptionPrices
}

const ConfiguratorContext = createContext<ConfiguratorContextValue | null>(null)

export function ConfiguratorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const optionPrices = useMemo((): OptionPrices => {
    const { config } = state
    const colorPrice = EXTERIOR_COLORS.find(c => c.id === config.exteriorColor)?.price ?? 0
    const wheelsPrice = WHEEL_OPTIONS.find(w => w.id === config.wheels)?.price ?? 0
    const roofPrice = ROOF_OPTIONS.find(r => r.id === config.roof)?.price ?? 0
    const materialPrice = INTERIOR_MATERIALS.find(m => m.id === config.interiorMaterial)?.price ?? 0
    const intColorPrice = INTERIOR_COLORS.find(c => c.id === config.interiorColor)?.price ?? 0
    const seatPrice = SEAT_CONFIGS.find(s => s.id === config.seatConfig)?.price ?? 0
    const techPrice = TECH_PACKAGES.find(t => t.id === config.techPackage)?.price ?? 0
    const enginePrice = ENGINE_OPTIONS.find(e => e.id === config.engine)?.price ?? 0
    const suspPrice = SUSPENSION_OPTIONS.find(s => s.id === config.suspension)?.price ?? 0
    const modePrice = DRIVING_MODES.find(d => d.id === config.drivingMode)?.price ?? 0
    const accPrice = config.accessories.reduce(
      (sum, id) => sum + (ACCESSORIES.find(a => a.id === id)?.price ?? 0),
      0,
    )
    return {
      exteriorColor: colorPrice,
      wheels: wheelsPrice,
      roof: roofPrice,
      interior: materialPrice + intColorPrice + seatPrice + techPrice,
      performance: enginePrice + suspPrice + modePrice,
      accessories: accPrice,
    }
  }, [state])

  const totalPrice = useMemo(() => {
    if (!state.selectedModel) return 0
    return (
      state.selectedModel.basePrice +
      optionPrices.exteriorColor +
      optionPrices.wheels +
      optionPrices.roof +
      optionPrices.interior +
      optionPrices.performance +
      optionPrices.accessories
    )
  }, [state.selectedModel, optionPrices])

  return (
    <ConfiguratorContext.Provider value={{ state, dispatch, totalPrice, optionPrices }}>
      {children}
    </ConfiguratorContext.Provider>
  )
}

export function useConfigurator() {
  const ctx = useContext(ConfiguratorContext)
  if (!ctx) throw new Error('useConfigurator must be used within ConfiguratorProvider')
  return ctx
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}
