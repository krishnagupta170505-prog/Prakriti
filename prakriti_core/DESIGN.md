---
name: Prakriti Core
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464554'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#7c43ab'
  on-secondary: '#ffffff'
  secondary-container: '#cb8ffd'
  on-secondary-container: '#581d87'
  tertiary: '#545c70'
  on-tertiary: '#ffffff'
  tertiary-container: '#6d7489'
  on-tertiary-container: '#fefcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#f2daff'
  secondary-fixed-dim: '#e0b6ff'
  on-secondary-fixed: '#2d004f'
  on-secondary-fixed-variant: '#632892'
  tertiary-fixed: '#dbe2fa'
  tertiary-fixed-dim: '#bfc6dd'
  on-tertiary-fixed: '#141b2c'
  on-tertiary-fixed-variant: '#3f4759'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Sora
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Sora
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Sora
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Sora
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 40px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system embodies a "Mystic Modernism" aesthetic—a fusion of ancient Ayurvedic wisdom and futuristic digital craft. It targets a design-conscious audience seeking wellness through a premium, tech-forward lens.

The visual language is rooted in **Glassmorphism** and **Minimalism**, utilizing high-transparency layers to simulate depth and clarity. The experience should feel ethereal yet grounded, avoiding traditional spiritual clichés in favor of a cinematic, "Apple-level" finish. Key characteristics include:
- **Atmospheric Depth:** Using background blurs and soft glows to create a sense of infinite space.
- **Precision Craft:** Hairline borders and intentional whitespace to signal quality and high-end positioning.
- **Fluidity:** Soft transitions and organic movement that mirror the flow of "Prana" or energy.

## Colors
The palette leverages high-contrast jewel tones against a pristine, breathable light background. 

- **Primary (Electric Indigo):** Used for interactive elements, primary calls to action, and active states.
- **Secondary (Rich Purple):** Reserved for deep accents, complex data visualizations, and brand-heavy moments.
- **Tertiary (Lavender):** Used for soft backgrounds, secondary surfaces, and subtle highlights.
- **Neutral (Deep Blue):** The anchor for typography and structural elements, providing a sophisticated alternative to pure black.
- **Surface Strategy:** Use ultra-subtle gradients (e.g., `#FFFFFF` to `#F1F5F9`) to prevent the light mode from feeling "flat."

## Typography
The typographic hierarchy relies on the tension between the editorial elegance of **Playfair Display** and the technical precision of **Sora**.

- **Headlines:** Use Playfair Display for all major headings. It should feel literary and authoritative. Use "Display" weights for hero sections with slight negative letter spacing to enhance the premium feel.
- **Body & UI:** Use Sora for all functional text. Its geometric nature provides high legibility and a modern, Gen-Z friendly "app" feel.
- **Labels:** Small labels and overlines should use Sora with increased letter spacing and uppercase styling to create a clear structural distinction.

## Layout & Spacing
The layout follows a **Fluid Grid** model with generous internal margins to evoke a sense of calm and luxury.

- **Grid:** Use a 12-column grid for desktop and a 4-column grid for mobile. 
- **Rhythm:** All spacing is derived from an 8px base unit. Vertical rhythm should be "airy"—when in doubt, add more space.
- **Safe Areas:** Maintain a minimum 20px margin on mobile devices to ensure elements do not feel crowded near screen edges.
- **Mobile First:** Prioritize bottom-oriented navigation and large touch targets (min 48px height) for easy one-handed operation during wellness activities.

## Elevation & Depth
Depth is created through **Glassmorphism** and **Tonal Layering** rather than traditional heavy shadows.

- **Glass Surfaces:** Use `backdrop-filter: blur(20px)` combined with a `50%` white opacity. Every glass element must have a 1px solid border in `rgba(255, 255, 255, 0.4)` to define its edges against the light background.
- **Ambient Glows:** Instead of drop shadows, use "Underglows"—soft, large-radius blurs of Primary or Secondary colors placed *behind* cards to indicate focus or importance.
- **Z-Axis:** 
  - Level 0: Background with organic, floating gradient shapes.
  - Level 1: Main content cards (Glassmorphic).
  - Level 2: Interactive elements (Buttons, Chips).
  - Level 3: Modals and Overlays (Heavier blur, subtle dark inner-stroke).

## Shapes
The shape language is fluid and organic, avoiding sharp corners to maintain a "soft-tech" feel.

- **Base Radius:** 0.5rem (8px) for small components like inputs.
- **Large Radius:** 1.5rem (24px) for main content cards and containers.
- **Pill Shapes:** Used exclusively for buttons and status indicators to emphasize their interactive nature.
- **Organic Elements:** Background elements should use non-geometric, "blob" shapes with animated CSS transitions to simulate living organisms.

## Components
- **Glass Cards:** Primary containers for content. They feature a 24px corner radius, a subtle 1px white border, and a 20px backdrop blur.
- **Premium Buttons:** 
    - *Primary:* Solid Electric Indigo with a soft white inner glow.
    - *Secondary:* Transparent background with a white glass effect and a lavender stroke.
- **Animated Progress:** Use thin, circular strokes for progress indicators (Mandala-inspired). As progress increases, the stroke should transition from Lavender to Electric Indigo.
- **Interactive Chips:** Small, pill-shaped elements with a light lavender background. On hover, they should "glow" slightly with a primary-colored shadow.
- **Input Fields:** Minimalist design with only a bottom border that expands into a full glassmorphic container upon focus.
- **Mandala Geometry:** Use SVG-based geometric patterns as subtle watermarks or background motifs in headers to reinforce the "Ancient Wisdom" narrative.