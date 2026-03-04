import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConfiguratorProvider } from './context/ConfiguratorContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ModelSelection from './pages/ModelSelection'
import Configurator from './pages/Configurator'
import Summary from './pages/Summary'
import Checkout from './pages/Checkout'
import ThankYou from './pages/ThankYou'

export default function App() {
  return (
    <BrowserRouter>
      <ConfiguratorProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/models" element={<ModelSelection />} />
          <Route path="/configure" element={<Configurator />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </ConfiguratorProvider>
    </BrowserRouter>
  )
}
