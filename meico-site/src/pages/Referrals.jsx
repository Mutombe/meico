import { useState } from 'react'
import { ArrowUpRight, Gift, Copy } from '@phosphor-icons/react'
import PageTransition from '../components/PageTransition.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import SectionSeam from '../components/SectionSeam.jsx'
import ReferralsHero from '../components/page-heroes/ReferralsHero.jsx'
import HexFrame from '../components/HexFrame.jsx'
import { referrals } from '../data/siteData.js'

export default function Referrals() {
  const [email, setEmail] = useState('')
  const [code, setCode]   = useState('')

  function generate(e) {
    e.preventDefault()
    if (!email) return
    // Mock code — derived from email (replace with backend later)
    const hash = btoa(email).replace(/[^A-Z0-9]/gi, '').slice(0, 6).toUpperCase()
    setCode(`MEICO-${hash}`)
  }

  function copy() {
    navigator.clipboard?.writeText(`https://meicolabs.com?ref=${code}`)
  }

  return (
    <PageTransition>
      <ReferralsHero kicker={referrals.kicker} intro={referrals.body} />

      <SectionSeam palette={['#3B82F6', '#22D3EE', '#E9C063']} variant="wave-soft" height={120} />

      {/* Three-step process */}
      <section className="container-edge py-12">
        <div className="grid md:grid-cols-3 gap-5">
          {referrals.steps.map((s, i) => (
            <SectionReveal key={s.n} delay={i * 0.05}>
              <div className="glass clip-corner p-6 md:p-7 h-full">
                <HexFrame size={56} accent="#3B82F6" filled>
                  <span className="font-display text-electric-300 text-base">{String(s.n).padStart(2, '0')}</span>
                </HexFrame>
                <h3 className="font-display text-paper text-xl mt-5">{s.title}</h3>
                <p className="mt-3 text-paper-dim text-[14.5px] leading-relaxed">{s.detail}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Generate code card */}
      <section className="container-edge py-12 md:py-16">
        <SectionReveal>
          <div className="max-w-xl mx-auto glass clip-corner p-7 md:p-9 text-center">
            <Gift size={36} weight="duotone" className="text-electric-400 mx-auto" />
            <h2 className="font-display text-paper text-2xl md:text-3xl mt-5">Generate your code</h2>
            <p className="mt-3 text-paper-dim text-sm">
              Enter your email and we'll create a unique referral link you can share.
            </p>

            <form onSubmit={generate} className="mt-8 flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@somewhere.com"
                className="w-full px-4 h-12 bg-midnight-700 border border-electric-500/20 focus:border-electric-500 outline-none rounded-md text-paper text-center placeholder:text-paper-mid"
              />
              <button type="submit" className="btn-electric justify-center">
                Generate referral code <ArrowUpRight size={12} weight="bold" />
              </button>
            </form>

            {code && (
              <div className="mt-7 p-5 rounded-md border border-electric-500/30 bg-midnight-700/50">
                <p className="mono text-paper-mid text-[0.55rem]">YOUR CODE</p>
                <p className="font-display text-2xl text-electric-300 tabular-nums mt-1">{code}</p>
                <button
                  onClick={copy}
                  className="mt-4 mono text-paper-mid text-[0.6rem] inline-flex items-center gap-2 ink-underline"
                >
                  <Copy size={11} weight="bold" /> Copy share link
                </button>
              </div>
            )}

            <p className="mt-5 mono text-paper-mid text-[0.55rem]">
              Mockup form · live submission wires to the backend at pre-sale launch
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* PDF download */}
      <section className="container-edge pb-24 text-center">
        <a href="/docs/meico-referral-program.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost">
          Full Referral Program PDF <ArrowUpRight size={12} weight="bold" />
        </a>
      </section>
    </PageTransition>
  )
}
