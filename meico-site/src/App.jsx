import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Why from './pages/Why.jsx'
import Tokenomics from './pages/Tokenomics.jsx'
import Roadmap from './pages/Roadmap.jsx'
import Documents from './pages/Documents.jsx'
import Referrals from './pages/Referrals.jsx'
import Faq from './pages/Faq.jsx'
import Contact from './pages/Contact.jsx'
import EcosystemIndex from './pages/ecosystem/Index.jsx'
import PillarPage from './pages/ecosystem/PillarPage.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTopOnNav() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  return (
    <Layout>
      <ScrollToTopOnNav />
      <AnimatePresence mode="popLayout">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/why" element={<Why />} />
          <Route path="/tokenomics" element={<Tokenomics />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ecosystem" element={<EcosystemIndex />} />
          <Route path="/ecosystem/:slug" element={<PillarPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}
