import { useState } from 'react'
import { ArrowUpRight, EnvelopeSimple, TwitterLogo, TelegramLogo, FacebookLogo } from '@phosphor-icons/react'
import PageTransition from '../components/PageTransition.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import SectionSeam from '../components/SectionSeam.jsx'
import ContactHero from '../components/page-heroes/ContactHero.jsx'
import { contact } from '../data/siteData.js'

const ICON = {
  Email: EnvelopeSimple,
  Twitter: TwitterLogo,
  Telegram: TelegramLogo,
  Facebook: FacebookLogo,
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General enquiry', message: '' })
  const update = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }))

  function submit(e) {
    e.preventDefault()
    const body =
      `Hello MEICO,\n\n${form.message}\n\n— ${form.name}${form.email ? ' · ' + form.email : ''}`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <PageTransition>
      <ContactHero
        kicker={contact.kicker}
        intro={contact.body}
        channels={contact.channels.length}
      />

      <SectionSeam palette={['#3B82F6', '#22D3EE', '#A855F7']} variant="wave-soft" height={120} />

      <section className="container-edge pb-24">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10">
          {/* Left — channels */}
          <SectionReveal>
            <div className="space-y-3">
              {contact.channels.map((c) => {
                const Icon = ICON[c.label]
                const external = !c.href.startsWith('mailto:')
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    target={external ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="glass glass-hover clip-corner p-5 flex items-center gap-4 group"
                  >
                    <span className="h-11 w-11 inline-flex items-center justify-center rounded-md border border-electric-500/25 text-electric-300 group-hover:bg-electric-500 group-hover:text-paper transition-colors">
                      {Icon && <Icon size={18} weight="regular" />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="mono text-paper-mid text-[0.55rem]">{c.label}</p>
                      <p className="font-display text-paper text-base mt-0.5 truncate">{c.value}</p>
                    </div>
                    <ArrowUpRight size={14} weight="bold" className="text-paper-mid group-hover:text-electric-300 transition-colors" />
                  </a>
                )
              })}
            </div>
          </SectionReveal>

          {/* Right — form */}
          <SectionReveal delay={0.1}>
            <form onSubmit={submit} className="glass clip-corner p-7 md:p-9">
              <h2 className="font-display text-paper text-2xl md:text-3xl">Send a note</h2>
              <p className="mt-2 text-paper-mid text-sm">
                We prefill an email from your default client — nothing leaves the browser without your confirmation.
              </p>

              <div className="mt-7 space-y-4">
                <Field label="Name">
                  <input required value={form.name} onChange={update('name')} className="fld" />
                </Field>
                <Field label="Email">
                  <input type="email" required value={form.email} onChange={update('email')} className="fld" />
                </Field>
                <Field label="Subject">
                  <select value={form.subject} onChange={update('subject')} className="fld">
                    <option>General enquiry</option>
                    <option>Pre-sale &amp; tokens</option>
                    <option>Partnerships</option>
                    <option>Press / Media</option>
                    <option>Developer / SDK</option>
                  </select>
                </Field>
                <Field label="Message">
                  <textarea rows="5" required value={form.message} onChange={update('message')} className="fld resize-y" />
                </Field>
              </div>

              <button type="submit" className="btn-electric mt-7">
                Open Email <ArrowUpRight size={12} weight="bold" />
              </button>
            </form>
          </SectionReveal>
        </div>
      </section>

      <style>{`
        .fld {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(15, 31, 66, 0.55);
          border: 1px solid rgba(96, 165, 250, 0.20);
          color: var(--color-paper);
          border-radius: 6px;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease;
          font-family: var(--font-body);
          font-size: 15px;
        }
        .fld:focus {
          border-color: rgba(96, 165, 250, 0.55);
          background: rgba(15, 31, 66, 0.85);
        }
      `}</style>
    </PageTransition>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mono text-paper-mid text-[0.55rem] mb-2 inline-block">{label}</span>
      {children}
    </label>
  )
}
