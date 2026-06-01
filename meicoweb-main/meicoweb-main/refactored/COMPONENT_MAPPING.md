# React Component Mapping Guide

This document maps the refactored HTML/CSS/JS structure to future React components.

## Component Hierarchy

```
<App>
  ├── <Header>
  │   ├── <ParticleBackground>
  │   ├── <Navbar>
  │   │   ├── <Logo>
  │   │   ├── <NavMenu>
  │   │   └── <MobileToggle>
  │   ├── <HeroSection>
  │   │   ├── <HeroContent>
  │   │   └── <SocialLinks>
  │   └── <PresaleCountdown>
  │
  ├── <AboutSection>
  │   ├── <SectionHeader>
  │   └── <VideoBox>
  │
  ├── <WhySection>
  │   ├── <SectionHeader>
  │   └── <ServiceGrid>
  │       └── <ServiceCard> (×6)
  │
  ├── <TokenSaleSection>
  │   ├── <SectionHeader>
  │   └── <TokenStats>
  │
  ├── <TokenAllocationSection>
  │   ├── <SectionHeader>
  │   ├── <TabNavigation>
  │   └── <PieChart>
  │
  ├── <DocumentsSection>
  │   ├── <SectionHeader>
  │   ├── <DocumentImage>
  │   └── <DocumentList>
  │       └── <DropdownButton> (×4)
  │
  ├── <RoadmapSection>
  │   ├── <SectionHeader>
  │   └── <Timeline>
  │       └── <TimelineItem> (×6)
  │
  ├── <TeamSection>
  │   └── <SectionHeader>
  │
  ├── <FAQSection>
  │   ├── <SectionHeader>
  │   └── <Accordion>
  │       └── <AccordionItem> (×5)
  │
  ├── <ContactSection>
  │   ├── <SectionHeader>
  │   ├── <ContactInfo>
  │   ├── <ContactForm>
  │   └── <Modal>
  │
  ├── <Footer>
  │   ├── <FooterLinks>
  │   ├── <NewsletterWidget>
  │   └── <Copyright>
  │
  └── <Preloader>
```

## Component Details

### Layout Components

#### `<Header>`
**Location**: `refactored/index.html` lines 52-186
**CSS**: `css/refactored/sections.css` - `.banner`, `.site-header`
**JS**: `js/refactored/main.js` - `initNavigation()`, `handleScroll()`
**Props**: None (container component)
**State**: `isSticky: boolean`

#### `<Navbar>`
**Location**: `refactored/index.html` lines 62-133
**CSS**: `css/refactored/components.css` - `.navbar`, `.nav-link`
**JS**: `js/refactored/main.js` - `initNavigation()`, `toggleMenu()`
**Props**: `links: Array<{href, label}>`
**State**: `isOpen: boolean`, `activeLink: string`

### Content Sections

#### `<HeroSection>`
**Location**: `refactored/index.html` lines 139-175
**CSS**: `css/refactored/sections.css` - `.banner`, `.header-txt`
**Props**: `title: string`, `subtitle: string`, `ctaButtons: Array`
**State**: None (presentational)

#### `<ServiceCard>`
**Location**: `refactored/index.html` lines 280-293 (example)
**CSS**: `css/refactored/components.css` - `.service-item`
**Props**: `icon: string`, `title: string`, `description: string`
**State**: None (presentational)
**Reusable**: Yes - used 6 times in Why section

#### `<TimelineItem>`
**Location**: Original `index.html` lines 470-486 (example)
**CSS**: `css/refactored/components.css` - `.timeline-item`
**Props**: `phase: string`, `title: string`, `items: Array<string>`
**State**: None (presentational)
**Reusable**: Yes - used 6 times in Roadmap

#### `<AccordionItem>`
**Location**: Original `index.html` lines 598-605 (example)
**CSS**: `css/refactored/components.css` - `.accordion-s2 .card`
**Props**: `question: string`, `answer: string`, `defaultOpen: boolean`
**State**: `isExpanded: boolean`
**Reusable**: Yes - used 5 times in FAQ

### Interactive Components

#### `<ContactForm>`
**Location**: Original `index.html` lines 669-695
**CSS**: `css/refactored/components.css` - `.input-field`, `.input-line`
**JS**: `js/refactored/main.js` - `handleContactFormSubmit()`
**Props**: `onSubmit: Function`, `apiEndpoint: string`
**State**: `formData: Object`, `errors: Object`, `isSubmitting: boolean`

#### `<Modal>`
**Location**: Original `index.html` lines 689-694
**CSS**: `css/refactored/components.css` - `.popup`
**JS**: `js/refactored/main.js` - `openPopup()`, `closePopup()`
**Props**: `isOpen: boolean`, `onClose: Function`, `title: string`, `message: string`
**State**: Controlled by parent

#### `<PresaleCountdown>`
**Location**: `refactored/index.html` lines 193-204
**CSS**: `css/refactored/components.css` - `.presale-countdown`
**JS**: `js/refactored/main.js` - `initCountdown()`
**Props**: `targetDate: Date`
**State**: `timeRemaining: Object {days, hours, minutes, seconds}`

### Utility Components

#### `<Button>`
**CSS**: `css/refactored/components.css` - `.btn`, `.btn-Meicon-s3`
**Props**: `variant: string`, `onClick: Function`, `children: ReactNode`
**State**: None (presentational)

#### `<SectionHeader>`
**Location**: `refactored/index.html` lines 230-242 (example)
**CSS**: `css/refactored/sections.css` - `.section-head-s7`
**Props**: `title: string`, `subtitle?: string`
**State**: None (presentational)
**Reusable**: Yes - used in every section

## State Management Needs

### Global State (Context/Redux)
- **Theme**: `currentTheme: string` (orange, blue, mint, etc.)
- **Language**: `locale: string` (for future i18n)
- **User**: `isLoggedIn: boolean`, `userData: Object`

### Component State (useState)
- **Navbar**: `isMobileMenuOpen: boolean`
- **Accordion**: `expandedItemId: string | null`
- **Tabs**: `activeTabId: string`
- **Forms**: `formData: Object`, `validationErrors: Object`
- **Countdown**: `timeRemaining: Object`
- **Modal**: `isOpen: boolean`

### Server State (React Query/SWR)
- **Contact Form**: Submission status
- **Newsletter**: Subscription status
- **Token Data**: Live token sale data (if applicable)

## File Structure Mapping

### Current Refactored Structure
```
refactored/
├── index.html          → App.jsx + page components
├── css/
│   └── refactored/
│       ├── base.css    → CSS variables, global styles
│       ├── components.css → Component styles
│       └── sections.css   → Section-specific styles
└── js/
    └── refactored/
        └── main.js     → Split into multiple modules
```

### Future React Structure
```
src/
├── App.jsx
├── index.jsx
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Preloader.jsx
│   ├── sections/
│   │   ├── HeroSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── WhySection.jsx
│   │   ├── TokenSaleSection.jsx
│   │   ├── TokenAllocationSection.jsx
│   │   ├── DocumentsSection.jsx
│   │   ├── RoadmapSection.jsx
│   │   ├── TeamSection.jsx
│   │   ├── FAQSection.jsx
│   │   └── ContactSection.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Modal.jsx
│   │   ├── Accordion.jsx
│   │   ├── Tabs.jsx
│   │   └── SectionHeader.jsx
│   └── features/
│       ├── ServiceCard.jsx
│       ├── TimelineItem.jsx
│       ├── AccordionItem.jsx
│       ├── ContactForm.jsx
│       ├── NewsletterForm.jsx
│       ├── PresaleCountdown.jsx
│       ├── ParticleBackground.jsx
│       └── VideoBox.jsx
├── hooks/
│   ├── useScrollAnimation.js
│   ├── useStickyHeader.js
│   ├── useCountdown.js
│   └── useForm.js
├── context/
│   ├── ThemeContext.jsx
│   └── AppContext.jsx
├── utils/
│   ├── config.js
│   ├── helpers.js
│   └── constants.js
├── styles/
│   ├── global.css
│   ├── variables.css
│   └── components/
│       ├── button.module.css
│       ├── card.module.css
│       └── ...
└── assets/
    ├── images/
    └── fonts/
```

## Migration Steps

### Step 1: Setup React Project
```bash
npx create-react-app meico-crypto
# or
npx create-vite@latest meico-crypto --template react
```

### Step 2: Install Dependencies
```bash
npm install react-router-dom
npm install react-tsparticles
npm install react-intersection-observer
npm install react-hook-form
npm install framer-motion
```

### Step 3: Copy Assets
- Move images from `images/` to `src/assets/images/`
- Move fonts from `assets/fonts/` to `src/assets/fonts/`
- Copy PDF files to `public/documents/`

### Step 4: Convert CSS
- Copy CSS variables from `base.css` to `src/styles/variables.css`
- Convert component styles to CSS modules or styled-components
- Set up global styles

### Step 5: Create Components (Bottom-Up)
1. Start with presentational components (Button, SectionHeader)
2. Build feature components (ServiceCard, TimelineItem)
3. Create section components (HeroSection, AboutSection)
4. Build layout components (Header, Footer)
5. Assemble in App.jsx

### Step 6: Add Interactivity
1. Implement hooks (useScrollAnimation, useCountdown)
2. Add form handling with react-hook-form
3. Set up context for global state
4. Implement routing if needed

### Step 7: Replace Libraries
- jQuery → React hooks and refs
- Owl Carousel → react-slick or Swiper
- Particles.js → react-tsparticles
- Waypoints → react-intersection-observer
- jQuery Validate → react-hook-form + yup

### Step 8: Testing & Optimization
1. Test all interactive features
2. Verify responsive design
3. Run Lighthouse audit
4. Optimize bundle size
5. Add lazy loading for images

## Key Considerations

### Props vs State
- **Props**: Data passed from parent (title, description, icon, etc.)
- **State**: Interactive data that changes (form inputs, accordion state, etc.)

### Component Composition
```jsx
// Good - Composable
<ServiceGrid>
  <ServiceCard icon="..." title="..." description="..." />
  <ServiceCard icon="..." title="..." description="..." />
</ServiceGrid>

// Better - Data-driven
<ServiceGrid services={servicesData} />
```

### Event Handling
```jsx
// Current: Inline onclick
<button onclick="openPopup()">Submit</button>

// React: Event handler prop
<Button onClick={handleSubmit}>Submit</Button>
```

### Styling Approach
Choose one:
1. **CSS Modules**: Scoped styles, good for migration
2. **Styled Components**: CSS-in-JS, component-scoped
3. **Tailwind CSS**: Utility-first, requires refactoring
4. **Emotion**: CSS-in-JS with better performance

Recommendation: **CSS Modules** - easiest migration path from current structure.

## Testing Strategy

### Unit Tests
- Test individual components in isolation
- Test utility functions and helpers
- Test custom hooks

### Integration Tests
- Test form submissions
- Test navigation and routing
- Test accordion/tab interactions

### E2E Tests
- Test complete user flows
- Test responsive behavior
- Test cross-browser compatibility

## Performance Optimization

### Code Splitting
```jsx
const HeroSection = lazy(() => import('./sections/HeroSection'));
const AboutSection = lazy(() => import('./sections/AboutSection'));
```

### Image Optimization
- Use WebP format with fallbacks
- Implement lazy loading
- Use responsive images with srcset

### Bundle Optimization
- Tree shaking unused code
- Minimize vendor bundles
- Use production builds

## Accessibility

### ARIA Labels
- Add aria-label to icon-only buttons
- Add aria-expanded to accordion items
- Add aria-current to active nav links

### Keyboard Navigation
- Ensure all interactive elements are keyboard accessible
- Add focus styles
- Implement skip links

### Screen Readers
- Use semantic HTML
- Add alt text to images
- Provide text alternatives for icons
