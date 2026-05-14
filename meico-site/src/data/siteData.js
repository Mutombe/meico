// MEICO — single source of truth.
// All copy lifted from the old meicoweb-main site + scraped meicolabs.com.
// One change here propagates everywhere on the site.

export const brand = {
  name: 'MEICO',
  longName: 'Meico Labs',
  tagline: 'Spurring the adoption of cryptocurrencies in Africa',
  positioning: 'An institutional-grade Layer-0 hybrid blockchain.',
  email: 'info@meicolabs.com',
  domain: 'meicolabs.com',
  logo: '/logo.png',
  socials: {
    twitter:  'https://twitter.com/Meicolabs',
    facebook: 'https://www.facebook.com/share/16AozXmJ4X/',
    telegram: 'https://t.me/+Yt6OEbuCIAhjZDI0',
  },
  partner: { name: 'Alphie Hub', url: 'https://alphiehub.com' },
}

// ====== HERO ======================================================
// Type-led hero. One italic-serif word ("Africa's") carries the brass
// accent — the *only* brass on screen apart from the hex meridian.
export const hero = {
  ticker:  'LAYER-0 · HYBRID · AFRICA-NATIVE',
  edition: 'Pre-sale · Coming soon',
  titleParts: [
    { text: 'Institutional rails for',         italic: false },
    { text: 'Africa’s',                   italic: true  },
    { text: 'on-chain economy.',               italic: false },
  ],
  subline:
    'A Layer-0 hybrid blockchain underpinning Real-World Assets and DePINs across the continent — built so freight, energy, tokenized companies and remittances all settle on a single chain.',
  // Rotating capability line — cycles in the hero, one at a time
  rotators: [
    'DePINs for freight services',
    'DePINs for renewable energy',
    'Tokenization of African start-ups',
  ],
  primary:   { label: 'Read the Whitepaper',  to: '/docs/meico-whitepaper.pdf', external: true },
  secondary: { label: 'Explore the Ecosystem', to: '/ecosystem' },
  // Tiny foot strip — institutional credentials (mono, single line)
  credentials: ['LAYER-0', 'STELLAR CONSENSUS', 'TWO-TOKEN', 'AFRICA · RWA · DePIN'],
}

// ====== NAV =======================================================
export const navLinks = [
  { label: 'About',      to: '/about' },
  { label: 'Why MEICO',  to: '/why' },
  { label: 'Ecosystem',  to: '/ecosystem' },
  { label: 'Tokenomics', to: '/tokenomics' },
  { label: 'Roadmap',    to: '/roadmap' },
  { label: 'Documents',  to: '/documents' },
  { label: 'Referrals',  to: '/referrals' },
  { label: 'FAQ',        to: '/faq' },
  { label: 'Contact',    to: '/contact' },
]

// ====== ABOUT =====================================================
export const about = {
  kicker: 'About MEICO',
  title: 'Institutional-grade infrastructure for an African economic step-change.',
  body: [
    "Meico is an institutional-grade Layer-0 hybrid blockchain with the capacity to support Real World Assets (RWA) and Decentralised Physical Infrastructure networks (DePINs). The Meico chain is built on the Stellar consensus protocol and uses a two-token model — the Meico-coin and the Meico stablecoin — both native to a single chain.",
    "Enhanced security, low transaction fees, high throughput, and scalability are the key attributes of our blockchain. With a hybrid model combining elements of a private and public blockchain, organisations developing on the network are free to control what data is accessible publicly and what stays private.",
    "Our mission is to leverage blockchain technology by employing every available strategic method to achieve near-total economic self-sufficiency in the African economy.",
  ],
  mission:
    'To achieve near-total economic self-sufficiency in the African economy — with blockchain as the mainspring.',
  attributes: [
    { label: 'Enhanced Security',  detail: 'Stellar consensus underpins a hardened, institutional-grade settlement layer.' },
    { label: 'Low Transaction Fees', detail: 'Layer-0 economics keep per-transaction cost near-zero across every product.' },
    { label: 'High Throughput',    detail: 'Built for continental scale — millions of settlements without congestion.' },
    { label: 'Hybrid Privacy',     detail: 'Public + private in one chain: organisations choose what is open and what stays sealed.' },
  ],
  ecosystem: {
    title: 'The Meico Ecosystem',
    body: [
      "Meico's objectives find their origins in expediting transaction processing for instant settlement, making the movement of goods quick, making it easy to access products on a single marketplace, accelerating the creation, development, and implementation of new ideas through research, and speeding up access to capital for nascent innovations through tokenization.",
      "Our steps toward providing solutions for economic growth build on the confidence that an array of blockchain-led solutions provides a simplified framework for solving complex problems hindering growth on the continent.",
    ],
    diagram: '/illustrations/ecosystem-diagram.png',
  },
}

// ====== WHY MEICO =================================================
export const why = {
  kicker: 'Why MEICO',
  title: 'Blockchain meets the major economic drivers.',
  intro:
    "Meico is uniquely positioned to spearhead the adoption of digital currencies in Africa using distributed ledger technology. We are motivated by the desire to see human capital, physical capital, natural resources, and new technology — the major drivers of economic growth — congealing into a robust foundation for sustainable long-term growth, with blockchain as the mainspring. We intend to work with experts across industries to supplant obsolete technologies with new ones and lower the high costs associated with creative destruction.",
  reasons: [
    {
      title: 'A hybrid Layer-0 chain',
      body: 'Combines the privacy controls of a permissioned chain with the transparency of a public one. Built on Stellar consensus — fast, low-fee, energy-efficient.',
    },
    {
      title: 'Two-token economics',
      body: 'The Meico-coin (utility + governance) and a fully-compliant Meico stablecoin, both native to a single chain. No bridges, no wrapped assets for everyday transactions.',
    },
    {
      title: 'Real-world asset focus',
      body: 'Designed from day one to underpin DePINs and tokenized real-world assets — from freight rigs to renewable energy plants to African start-up equity.',
    },
    {
      title: 'Pan-African remit',
      body: 'Every product in the ecosystem is sized for African scale and African problems — from MeicoPay remittances to the B2B marketplace to the Research Institute.',
    },
  ],
}

// ====== PILLARS (the 7 ecosystem products) ========================
export const pillars = [
  {
    slug: 'research-institute',
    name: 'Research Institute',
    short: 'Turns research into real-world products + new African industries.',
    accent: 'pillar-research',
    accentHex:  '#4F8AF6',
    accentHex2: '#8B5CF6',
    letter: 'R',
    verb: 'Inventing',
    heroImage: '/illustrations/research.png',
    iconImage: '/pillar-icons/research-institute.png',
    summary:
      "The world is facing a fresh wave of technological changes coming at unprecedented speeds. Africa is lagging far behind despite being bestowed with abundant minerals, fertile arable lands, and many other gifts of nature. The impairment of knowledge and skills accumulated over the past decades calls for a research institute focused mainly on transforming existing inventions into practical processes and products that have real-world utility.",
    body: [
      'The Research Institute is the spine of the Meico vision — applied, fundamental, experimental, developmental, interdisciplinary and theoretical research feeding directly into eight new industry verticals across the continent.',
      'Outputs from the Institute flow into the B2B Marketplace, into tokenized funding rounds for prototypes, and into open IP pools usable by African manufacturers.',
    ],
    features: [
      { label: 'Applied Research',           detail: 'Direct industrial application of scientific knowledge.' },
      { label: 'Fundamental Research',       detail: 'Foundational discovery without immediate commercial intent.' },
      { label: 'Experimental Research',      detail: 'Hypothesis-driven testing in controlled conditions.' },
      { label: 'Developmental Research',     detail: 'Translating findings into products and processes.' },
      { label: 'Interdisciplinary Research', detail: 'Cross-domain collaboration unlocking new industries.' },
      { label: 'Theoretical Research',       detail: 'Models and frameworks underpinning future invention.' },
    ],
    industries: [
      'Advanced Electronics & Semiconductors',
      'Green Energy & Sustainability',
      'Biotechnology & HealthTech',
      'Industrial Automation & Robotics',
      'Artificial Intelligence & Data Science',
      'Aerospace & Defense',
      'Advanced Materials & Nanotechnology',
    ],
    outcomes: ['Economic Growth', 'Job Creation', 'Global Competitiveness', 'Sustainable Development'],
  },
  {
    slug: 'b2b',
    name: 'B2B Marketplace',
    short: 'A single pan-African marketplace where new products reach critical mass.',
    accent: 'pillar-b2b',
    accentHex:  '#38BDF8',
    accentHex2: '#06B6D4',
    letter: 'B',
    verb: 'Connecting',
    heroImage: '/illustrations/b2b.png',
    iconImage: null,
    summary:
      'Newly introduced products from new innovations need a common marketplace as the first step toward reaching critical mass. With the B2B offering a latitude of payment options and shipping methods, adoption eventually becomes self-sustaining — letting manufacturers scale and ramp up production due to rising demand and healthy competition.',
    body: [
      'B2B is the on-ramp for African manufacturers, suppliers and corporate buyers. Native MEICO settlement, MeicoPay rails, and freight DePINs integration mean a product can be discovered, ordered, paid for and shipped without leaving the ecosystem.',
    ],
    features: [
      { label: 'Stronger Business Partnerships', detail: 'B2B collaboration builds trust, creates lasting partnerships and drives shared growth.' },
      { label: 'Increased Efficiency & Productivity', detail: 'B2B solutions streamline operations, reduce costs and improve productivity across the supply chain.' },
      { label: 'Expanded Market Access', detail: 'B2B opens doors to new markets, enabling businesses to scale locally and compete globally.' },
      { label: 'Quality, Innovation & Competitiveness', detail: 'Access to better products, services and technologies drives quality, innovation and business competitiveness.' },
    ],
  },
  {
    slug: 'exchange',
    name: 'Meico Exchange',
    short: 'Centralised + Decentralised exchanges. One ecosystem.',
    accent: 'pillar-exchange',
    accentHex:  '#06B6D4',
    accentHex2: '#14B8A6',
    letter: 'X',
    verb: 'Trading',
    heroImage: '/illustrations/exchange.png',
    iconImage: '/pillar-icons/exchange.png',
    summary:
      'The Meico crypto exchange gives users access to a wide range of cryptocurrencies, offering diverse trading options on a user-friendly interface. High liquidity and strong security are our top priorities. The goal is to ensure that everyone on the continent has access to cryptocurrencies and tokenized assets.',
    body: [
      'Centralised Exchange (CEX) — drives adoption, liquidity and trust. Familiar to first-time crypto users, with simplified crypto-access flows for everyone, including non-tech-savvy users.',
      'Decentralised Exchange (DEX) — promotes freedom, inclusion and resilience. Users retain full control of their funds without relying on intermediaries, protecting financial privacy.',
    ],
    features: [
      { label: 'Centralised Exchange (CEX)',     detail: 'Driving adoption, liquidity and trust.' },
      { label: 'Ease of Use & Accessibility',    detail: 'A user-friendly platform that simplifies crypto access for everyone.' },
      { label: 'High Liquidity & Fast Transactions', detail: 'Deep liquidity and fast order execution support seamless trading and stability.' },
      { label: 'On-ramp for Local Economies',    detail: 'A wide easy fiat-to-crypto pipeline supporting local payment methods and financial inclusion.' },
      { label: 'Decentralised Exchange (DEX)',   detail: 'Promoting freedom, inclusion and resilience.' },
      { label: 'Financial Freedom & Self-Custody', detail: 'Users retain full control without relying on intermediaries.' },
      { label: 'Access Without Borders',         detail: 'Anyone with an internet connection can trade without restrictions, unleashing the unbanked across Africa.' },
      { label: 'Innovation & Local Empowerment', detail: 'DEXs foster innovation, local projects and Web3 development, creating jobs and driving economic growth.' },
    ],
  },
  {
    slug: 'meico-pay',
    name: 'MeicoPay',
    short: 'A secure money-transfer wallet with fiat on/off-ramps and remittances.',
    accent: 'pillar-pay',
    accentHex:  '#A855F7',
    accentHex2: '#EC4899',
    letter: 'P',
    verb: 'Settling',
    heroImage: '/illustrations/pay.png',
    iconImage: '/pillar-icons/meico-pay.png',
    summary:
      'An online money-transfer application offering a secure payment gateway to users and consumers on the B2B platform. MeicoPay provides fiat on-ramps and off-ramps, making it possible and easy for users to move money from fiat to crypto and crypto to fiat. The minuscule fees and convenience facilitate the mass adoption of cryptocurrencies.',
    body: [
      'MeicoPay is the consumer-facing surface of the ecosystem — a wallet for the Meico-coin, the Meico stablecoin, and a curated set of major cryptocurrencies. Fiat rails plug into mobile-money networks for instant on/off-ramps across the continent.',
    ],
    features: [
      { label: 'Mobile + Web Wallet',     detail: 'Native iOS, Android and a full web client.' },
      { label: 'Fiat On/Off Ramps',       detail: 'Move money from fiat to crypto and back through mobile-money rails.' },
      { label: 'Cross-Border Remittances', detail: 'Settle stablecoin transfers across African borders in seconds, not days.' },
      { label: 'Minuscule Fees',           detail: 'Layer-0 economics keep per-transaction costs near-zero.' },
      { label: 'Payment Gateway',          detail: 'Embedded checkout for the B2B Marketplace and external merchants.' },
      { label: 'Self-Custody',             detail: 'You hold your keys. MeicoPay never custodies user funds.' },
    ],
  },
  {
    slug: 'tokenization',
    name: 'Meico Tokenization',
    short: 'Mobilising capital into the sectors that build Africa.',
    accent: 'pillar-token',
    accentHex:  '#60A5FA',
    accentHex2: '#818CF8',
    letter: 'T',
    verb: 'Mobilising',
    heroImage: '/illustrations/tokenization.png',
    iconImage: '/pillar-icons/tokenization.png',
    summary:
      "Tokenization will largely boost the continent's capacity to establish new industries at a faster rate. Existing industries will be able to raise money to replace obsolete innovations with new ones for rapid, sustainable economic growth. Tokenization is the key to mobilising funds into important sectors of economies — with benefits accruing both to issuers and investors. The dynamism of manufacturing companies in Africa would be guaranteed if the asset tokenization concept is widely adopted.",
    body: [
      'Meico Tokenization powers Africa\'s growth by transforming nine key economic sectors. Compliant fractional ownership, real-time settlement, and transparent on-chain title — accessible from anywhere in the world.',
    ],
    sectors: [
      { name: 'Agriculture',         detail: 'Tokenized equity for smallholders and agribusiness. Easier access to financing. Transparent supply chains. Reduced post-harvest losses.' },
      { name: 'Financial Services',  detail: 'Greater financial inclusion. Fractional ownership of assets. Cross-border payments. Cheaper, faster settlements.' },
      { name: 'Manufacturing',       detail: 'Asset tokenization for funding. Supply-chain transparency. Working capital, scaled. Boost to industrial growth.' },
      { name: 'Trade & Commerce',    detail: 'Tokenized trade finance. Reduced friction in trade. Real-time payments. Boost for SMEs and exports.' },
      { name: 'Education',           detail: 'Tokenized credentials. Access to education funding. Global recognition. Lifelong learning ecosystem.' },
      { name: 'Real Estate',         detail: 'Fractional property ownership. Liquidity in illiquid assets. Lower transaction costs. Broader investor access.' },
      { name: 'Energy & Utilities',  detail: 'Tokenized energy assets. Decentralised energy funding. Attract infrastructure funding. Reliable service delivery.' },
      { name: 'Public Sector',       detail: 'Tokenized public assets. Transparent governance. Efficient & revenue systems. Greater trust and participation.' },
    ],
    outcomes: [
      'Increased Liquidity & Market Access',
      'Lower Capital Barriers & Greater Inclusion',
      'Enhanced Transparency & Trust',
      'Faster Settlement & Operational Efficiency',
      'Access to Global Capital & Investment',
      'Economic Growth & Innovation Enablement',
    ],
  },
  {
    slug: 'shipping',
    name: 'Meico Shipping',
    short: 'Freight DePINs that streamline the movement of goods across the continent.',
    accent: 'pillar-shipping',
    accentHex:  '#F59E0B',
    accentHex2: '#F97316',
    letter: 'S',
    verb: 'Moving',
    heroImage: '/illustrations/freight.png',
    iconImage: '/pillar-icons/shipping.png',
    summary:
      'Meico Shipping will significantly reduce the costs and time associated with shipping. Trade volumes will substantially increase, opening more distribution channels. DePINs for freight services will incentivize providers of shipping infrastructure to offer reliable services at affordable prices, streamlining the movement of goods across the continent.',
    body: [
      'A decentralised physical infrastructure network for African freight — trucks, warehouses, sea-freight, last-mile riders — coordinated by smart contracts and rewarded in MEICO.',
    ],
    features: [
      { label: 'Reduced Cost & Time',         detail: 'Fewer middlemen, instant settlement, on-chain dispatch.' },
      { label: 'Reliable Infrastructure',     detail: 'DePIN incentives align provider uptime with continuous reward.' },
      { label: 'Open Distribution Channels',  detail: 'Manufacturers reach buyers across the continent without bespoke logistics deals.' },
      { label: 'Trust & Traceability',        detail: 'Provenance and chain-of-custody recorded on-chain — visible to buyer and seller.' },
    ],
  },
  {
    slug: 'energy',
    name: 'Energy DePINs',
    short: 'Decentralised infrastructure for African renewable energy.',
    accent: 'pillar-energy',
    accentHex:  '#22C55E',
    accentHex2: '#84CC16',
    letter: 'E',
    verb: 'Powering',
    heroImage: '/illustrations/energy.png',
    iconImage: '/pillar-icons/energy.png',
    summary:
      'DePINs for Renewable Energy — powering Africa\'s sustainable future. Bringing clean, reliable energy to underserved and off-grid communities through a coordinated, incentivised network of producers.',
    body: [
      'A capital-formation layer for African renewables. Tokenized assets coordinate funding for solar, wind and storage; chain-recorded telemetry rewards uptime and clean generation.',
    ],
    features: [
      { label: 'Decentralised Energy Access',     detail: 'Bring clean, reliable energy to underserved and off-grid communities.' },
      { label: 'Lower Costs & Affordability',     detail: 'Reduce infrastructure and transaction costs, making renewable energy more affordable.' },
      { label: 'Transparency & Trust',            detail: 'Immutable records and real-time data build trust and accountability across the energy ecosystem.' },
      { label: 'Grid Resilience & Reliability',   detail: 'Decentralised networks enhance grid stability and ensure continuous energy supply.' },
      { label: 'Investment & Financing Unlocked', detail: 'Tokenized assets and new models attract global investment and unlock capital for green projects.' },
      { label: 'Local Economic Growth',           detail: 'Creates jobs, empowers local communities, and drives sustainable economic development.' },
    ],
  },
]

// ====== TOKENOMICS ================================================
export const tokenomics = {
  kicker: 'The Token',
  title: 'A two-token model, capped, transparent.',
  intro:
    'MEICO uses a permanently-capped supply of 1,000,000,000 tokens, with a soft cap of $4.5M (360M tokens) and a hard cap of $18M for the public sale. Distribution to participants takes place 30 days after the token sale ends.',
  numbers: [
    { label: 'Tokens Offered',     value: '360M' },
    { label: 'Soft Cap',           value: '$4.5M' },
    { label: 'Hard Cap',           value: '$18M' },
    { label: 'Max Supply',         value: '1B', note: 'Permanently capped' },
    { label: 'Distribution',       value: '30 days after sale ends' },
  ],
  allocation: [
    { label: 'Token Sale Program',         pct: 36, hex: '#3B82F6' },
    { label: 'Development Team & Founders', pct: 27, hex: '#06B6D4' },
    { label: 'Ecosystem Development',      pct: 20, hex: '#60A5FA' },
    { label: 'Marketing & Bounty',         pct: 11, hex: '#C7A352' },
    { label: 'Board Advisors',             pct:  6, hex: '#A855F7' },
  ],
  useOfFunds: [
    { label: 'Product Development',  pct: 40, hex: '#3B82F6' },
    { label: 'Marketing',            pct: 20, hex: '#06B6D4' },
    { label: 'Operational',          pct: 18, hex: '#60A5FA' },
    { label: 'Business Development', pct: 12, hex: '#C7A352' },
    { label: 'Legal & Regulation',   pct: 10, hex: '#A855F7' },
  ],
}

// ====== ROADMAP ===================================================
export const roadmap = [
  {
    phase: 'Phase 1', title: 'Presale', status: 'Active',
    summary: 'Community, capital and the token go live.',
    items: [
      'Community engagement',
      'First grand marketing campaign',
      'Token presale',
      'Token distribution',
      'Token launch — DEX listing',
      'Technical whitepaper release',
      'CEX listings',
    ],
  },
  {
    phase: 'Phase 2', title: 'Foundational Infrastructure & Ecosystem Development Kick-off', status: 'Upcoming',
    summary: 'The chain, the stablecoin, the wallet — the bedrock.',
    items: [
      'Layer-0 Blockchain Development — an interoperability layer and security layer',
      'Development of Layer-1 Energy DePINs — IoT integration and real-world asset tracking',
      'Meico Stablecoin development — a fully transparent and compliant stablecoin',
      'MeicoPay development — an MVP for payments, swaps and cross-border remittances',
      'Comprehensive compliance and licensing framework (incl. KYC/AML) for multiple jurisdictions',
      'Meico Chain Audit & Meico Wallet development',
      'Meico Mainnet launch (Utility + Governance)',
      'Green Energy DePINs launch',
    ],
  },
  {
    phase: 'Phase 3', title: 'Marketplace Ecosystem Expansion', status: 'Planned',
    summary: 'The DEX, the tokenization suite and freight come online.',
    items: [
      'Decentralized Exchange (DEX) development',
      'Tokenization Suite — support for RWAs, NFTs, energy credits, etc.',
      'L1 Freight Services DePINs development — real-time tracking and dispute resolution',
      'Launch of tokenization suite',
      'Decentralized Exchange (DEX) launch',
      'MeicoPay launch',
    ],
  },
  {
    phase: 'Phase 4', title: 'Centralized Infrastructure + B2B Development', status: 'Planned',
    summary: 'Institutional rails and the developer SDK.',
    items: [
      'Centralized Exchange (CEX) — deep liquidity, fiat support and institutional onboarding',
      'B2B development — supply-chain tracking and a stablecoin payment option',
      'Cross-Chain Interoperability SDK — an open-source SDK for developers',
    ],
  },
  {
    phase: 'Phase 5', title: 'Launch of Remaining Products', status: 'Planned',
    summary: 'The full ecosystem, in market.',
    items: [
      'Second big marketing campaign',
      'Meico Exchange (CEX) launch',
      'B2B launch',
      'Freight Services DePINs launch',
    ],
  },
  {
    phase: 'Phase 6', title: 'Ecosystem Maturation & Global Scaling', status: 'Long-horizon',
    summary: 'DAO governance, the Research Institute, the world.',
    items: [
      'DAO Governance Framework — community-controlled governance of core components',
      'Regulatory Compliance Suite — open-source toolkits and APIs for compliance across regions',
      'Establishment of the Research Institute',
      'Regional partnerships',
      'Global Scaling Initiatives',
    ],
  },
]

// ====== DOCUMENTS =================================================
export const documents = [
  { name: 'Genesis Whitepaper',  kind: 'PDF · The full technical and economic case', file: '/docs/meico-whitepaper.pdf' },
  { name: 'Annexure',            kind: 'PDF · Statistical data',                       file: '/docs/meico-annexure.pdf' },
  { name: 'Tokenomics',          kind: 'PDF · Detailed token mechanics',               file: '/docs/meico-tokenomics.pdf' },
  { name: 'Referral Program',    kind: 'PDF · 10% bonus rules',                        file: '/docs/meico-referral-program.pdf' },
  { name: 'Terms of Coin Sale',  kind: 'PDF · Legal',                                  file: '/docs/meico-terms-of-coin-sale.pdf' },
  { name: 'Privacy Policy',      kind: 'PDF · Legal',                                  file: '/docs/meico-privacy-policy.pdf' },
]

// ====== REFERRALS =================================================
export const referrals = {
  kicker: 'Referrals',
  title: 'Bring a friend, earn a 10% bonus.',
  body:
    'During the pre-sale you can refer friends and partners to MEICO. For every successful contribution from someone using your code, you receive a 10% bonus in MEICO tokens, paid out at distribution.',
  steps: [
    { n: 1, title: 'Get your code',     detail: 'Register as a referrer below and we send you a unique link.' },
    { n: 2, title: 'Share with people', detail: 'Send your link to anyone interested in the pre-sale.' },
    { n: 3, title: 'Earn 10% in MEICO', detail: 'Every successful purchase routed through your link earns you 10% paid at distribution.' },
  ],
}

// ====== FAQ =======================================================
export const faq = [
  { q: 'What is MEICO?',
    a: "MEICO is an institutional-grade Layer-0 hybrid blockchain built on the Stellar consensus protocol, designed to underpin Real-World Assets and DePINs across Africa." },
  { q: 'When is the token sale?',
    a: 'Pre-sale is coming soon. Subscribe to the newsletter or follow our Twitter for the start-date announcement.' },
  { q: 'What is the token cap?',
    a: 'A maximum supply of 1,000,000,000 MEICO, permanently capped. The current public sale offers 360M tokens at a $4.5M soft cap and $18M hard cap.' },
  { q: 'When are tokens distributed?',
    a: 'Tokens are distributed to participants 30 days after the token sale ends.' },
  { q: 'What can I do with the Meico-coin?',
    a: 'Pay for goods and services on MeicoPay and the B2B Marketplace, stake on the Meico Exchange, participate in DAO governance once Phase 4 is live, and pay network fees.' },
  { q: 'What is the Meico stablecoin?',
    a: 'A fully transparent and compliance-first stablecoin native to the Meico chain, used for everyday transactions, remittances and B2B settlements.' },
  { q: 'Which currencies can I use to participate?',
    a: 'The pre-sale will accept major cryptocurrencies and supported fiat on-ramps through MeicoPay partners. Specific currencies will be confirmed at launch.' },
  { q: 'Is MEICO open-source?',
    a: 'The core chain, the cross-chain interoperability SDK, and the Meico Wallet are open-sourced. Some marketplace and exchange components remain proprietary during early development.' },
  { q: 'Where is MEICO based?',
    a: 'MEICO operates across multiple African jurisdictions. Contact info@meicolabs.com for partnership and regulatory enquiries.' },
  { q: 'How does the referral program work?',
    a: 'During the pre-sale, every successful purchase routed through your unique referral link earns you a 10% bonus in MEICO, paid at distribution.' },
]

// ====== CONTACT ===================================================
export const contact = {
  kicker: 'Reach the team',
  title: 'Let\'s talk.',
  body: 'Whether you\'re a builder, an investor, a regional partner or simply curious — drop a note and we\'ll respond within the working week.',
  email: 'info@meicolabs.com',
  channels: [
    { label: 'Email',    value: 'info@meicolabs.com', href: 'mailto:info@meicolabs.com' },
    { label: 'Twitter',  value: '@Meicolabs',         href: 'https://twitter.com/Meicolabs' },
    { label: 'Telegram', value: 'Join our channel',   href: 'https://t.me/+Yt6OEbuCIAhjZDI0' },
    { label: 'Facebook', value: 'Follow on Facebook', href: 'https://www.facebook.com/share/16AozXmJ4X/' },
  ],
}
