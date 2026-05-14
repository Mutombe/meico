import { Link } from 'react-router-dom'
import {
  TwitterLogo,
  FacebookLogo,
  TelegramLogo,
  EnvelopeSimple,
  ArrowRight,
} from '@phosphor-icons/react'
import { brand, navLinks, pillars } from '../data/siteData'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-midnight-800 border-t border-electric-500/12 text-paper-dim mt-24">
      {/* Top hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric-500/40 to-transparent" />

      <div className="container-edge py-16 sm:py-20">
        {/* Wordmark + tagline + sub */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          <div className="lg:col-span-5 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={brand.logo} alt={`${brand.name} logo`} className="h-9 w-auto" />
            </Link>
            <p className="font-display text-2xl md:text-3xl text-paper leading-tight max-w-md">
              Spurring the adoption of cryptocurrencies in <span className="italic-accent">Africa.</span>
            </p>
            <p className="text-sm leading-relaxed text-paper-mid max-w-md">
              An institutional-grade Layer-0 hybrid blockchain — built for Real-World Assets, DePINs and a pan-African economic step-change.
            </p>
            <div className="flex items-center gap-2 pt-2">
              {[
                { href: brand.socials.twitter,  label: 'Twitter',  Icon: TwitterLogo },
                { href: brand.socials.facebook, label: 'Facebook', Icon: FacebookLogo },
                { href: brand.socials.telegram, label: 'Telegram', Icon: TelegramLogo },
                { href: `mailto:${brand.email}`, label: 'Email',    Icon: EnvelopeSimple },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-10 w-10 inline-flex items-center justify-center rounded-md border border-electric-500/15 text-paper-mid hover:bg-electric-500 hover:text-paper hover:border-electric-500 transition-colors"
                >
                  <Icon size={17} weight="regular" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mono text-paper text-[0.65rem] mb-5">— Navigate</h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-paper-dim hover:text-electric-300 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mono text-paper text-[0.65rem] mb-5">— Ecosystem</h4>
            <ul className="space-y-2.5 text-sm">
              {pillars.map((p) => (
                <li key={p.slug}>
                  <Link to={`/ecosystem/${p.slug}`} className="text-paper-dim hover:text-electric-300 transition-colors">{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mono text-paper text-[0.65rem] mb-5">— Documents</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/docs/meico-whitepaper.pdf"      target="_blank" rel="noopener noreferrer" className="hover:text-electric-300">Whitepaper</a></li>
              <li><a href="/docs/meico-tokenomics.pdf"      target="_blank" rel="noopener noreferrer" className="hover:text-electric-300">Tokenomics</a></li>
              <li><a href="/docs/meico-annexure.pdf"        target="_blank" rel="noopener noreferrer" className="hover:text-electric-300">Annexure</a></li>
              <li><a href="/docs/meico-referral-program.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-electric-300">Referrals</a></li>
              <li><a href="/docs/meico-terms-of-coin-sale.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-electric-300">Terms</a></li>
              <li><a href="/docs/meico-privacy-policy.pdf"  target="_blank" rel="noopener noreferrer" className="hover:text-electric-300">Privacy</a></li>
            </ul>
          </div>
        </div>

        {/* Pre-sale strip */}
        <div className="border-t border-electric-500/12 pt-8 grid md:grid-cols-2 gap-6 items-center">
          <p className="mono text-paper-mid text-[0.62rem]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-electric-400 animate-pulse mr-2 align-middle" />
            Pre-sale · Coming soon · 360M tokens · Soft cap $4.5M · Hard cap $18M
          </p>
          <div className="md:text-right">
            <Link to="/tokenomics" className="btn-electric">
              See Tokenomics <ArrowRight size={12} weight="bold" />
            </Link>
          </div>
        </div>

        {/* Colophon */}
        <div className="border-t border-electric-500/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 mono text-paper-mid text-[0.58rem]">
          <p>© {year} · {brand.longName}. All rights reserved.</p>
          <p>
            Partner ·{' '}
            <a href={brand.partner.url} target="_blank" rel="noopener noreferrer" className="text-electric-300 hover:text-electric-200">
              {brand.partner.name}
            </a>
          </p>
          <p>{brand.domain}</p>
        </div>
      </div>
    </footer>
  )
}
