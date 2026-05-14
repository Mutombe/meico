import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { brand, navLinks } from '../data/siteData'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-midnight-700/85 backdrop-blur-md border-b border-electric-500/15' : 'bg-transparent'
      }`}
    >
      <nav className="container-edge h-[64px] flex items-center justify-between">
        {/* Wordmark + hex-M logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src={brand.logo} alt={`${brand.name} logo`} className="h-8 w-auto" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `mono text-[0.6rem] transition-colors duration-300 ${
                    isActive
                      ? 'text-electric-400'
                      : 'text-paper-mid hover:text-paper'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Pre-sale CTA — desktop */}
        <Link
          to="/tokenomics"
          className="hidden lg:inline-flex items-center gap-2 px-4 h-9 border border-electric-500/40 text-electric-300 hover:bg-electric-500 hover:text-paper transition-all duration-300 mono text-[0.6rem] rounded-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-electric-400 animate-pulse" />
          Pre-sale · Coming soon
        </Link>

        {/* Mobile cluster — pre-sale pill beside the menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/tokenomics"
            className="inline-flex items-center gap-1.5 px-3 h-9 border border-electric-500/40 text-electric-300 mono text-[0.54rem] rounded-md whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-electric-400 animate-pulse" />
            Pre-sale
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="text-paper h-10 w-10 inline-flex items-center justify-center rounded-md border border-electric-500/20"
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-midnight-800/95 backdrop-blur-md border-t border-electric-500/15"
          >
            <ul className="container-edge py-6 space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block text-xl py-1.5 ${isActive ? 'text-electric-400' : 'text-paper'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
