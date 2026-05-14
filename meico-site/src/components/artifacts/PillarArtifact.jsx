import ResearchArtifact from './pillars/ResearchArtifact.jsx'
import B2BArtifact from './pillars/B2BArtifact.jsx'
import ExchangeArtifact from './pillars/ExchangeArtifact.jsx'
import PayArtifact from './pillars/PayArtifact.jsx'
import TokenizationArtifact from './pillars/TokenizationArtifact.jsx'
import ShippingArtifact from './pillars/ShippingArtifact.jsx'
import EnergyArtifact from './pillars/EnergyArtifact.jsx'

const MAP = {
  'research-institute': ResearchArtifact,
  'b2b':                B2BArtifact,
  'exchange':           ExchangeArtifact,
  'meico-pay':          PayArtifact,
  'tokenization':       TokenizationArtifact,
  'shipping':           ShippingArtifact,
  'energy':             EnergyArtifact,
}

export default function PillarArtifact({ slug, c1, c2 }) {
  const Cmp = MAP[slug]
  if (!Cmp) return null
  return <Cmp c1={c1} c2={c2} />
}
