---
name: Academic Excellence Framework
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#43474f'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737780'
  outline-variant: '#c3c6d1'
  surface-tint: '#3a5f94'
  primary: '#001e40'
  on-primary: '#ffffff'
  primary-container: '#003366'
  on-primary-container: '#799dd6'
  inverse-primary: '#a7c8ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#2e1a00'
  on-tertiary: '#ffffff'
  tertiary-container: '#4b2d00'
  on-tertiary-container: '#d98b00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a7c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#1f477b'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Public Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is built on the pillars of **Academic Authority** and **Supportive Clarity**. It balances the weight of institutional credibility with the digital fluency of Gen Z Vietnamese students. The aesthetic is **Modern Corporate**, utilizing a high-ratio of white space to reduce cognitive load during complex decision-making processes. 

The visual language emphasizes transparency and guidance. By stripping away unnecessary ornamentation, the design system focuses the user's attention on data-driven insights and personalized educational pathways. The emotional response should be one of "structured optimism"—a feeling that the user's future is manageable and well-planned.

## Colors

The palette is anchored by **Academic Blue**, a deep, stable navy that communicates reliability and heritage. This is contrasted by two functional accent colors used for status-driven feedback:

*   **Academic Blue (#003366):** Primary brand interactions, navigation, and authoritative headings.
*   **Success Green (#10B981):** Representing "Safe" matches and completed milestones.
*   **Aspire Gold (#F59E0B):** Signifying "Reach" targets and high-value opportunities.
*   **Neutral Palette:** Utilizes a scale of cool grays (from #F8FAFC to #0F172A) to maintain a clean, institutional environment.

Backgrounds remain predominantly white (#FFFFFF) to ensure maximum legibility and a contemporary, "light" feel.

## Typography

This design system employs a dual-font strategy to bridge the gap between institutional rigor and local accessibility:

1.  **Public Sans (Headings):** A strong, geometric sans-serif that provides an institutional, "official" feel. Used for all headers and display text to establish authority.
2.  **Be Vietnam Pro (UI & Body):** Optimized for the Vietnamese language, this font provides a warm and approachable tone for long-form reading, application forms, and interactive labels.

Hierarchy is maintained through consistent weight distribution. Use **SemiBold (600)** for clarity in subheaders and **Medium (500)** for interactive labels to ensure they stand out against body copy.

## Layout & Spacing

The design system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile devices. The spacing logic is strictly based on a **base-8 unit** (8px, 16px, 24px, 32px, etc.) to ensure mathematical harmony across all layouts.

*   **Desktop:** 1280px max-width container with 24px gutters. Use generous vertical padding (64px+) between sections to allow content to "breathe."
*   **Mobile:** 16px side margins. Cards and components should typically span the full width of the mobile container to maximize readability.
*   **Alignment:** Standardize on left-aligned text for better scanability, especially in data-heavy university profile pages.

## Elevation & Depth

This design system avoids heavy drop shadows in favor of **Tonal Layering** and **Soft Ambient Shadows**. The goal is to create a sense of organized "sheets" of information.

*   **Level 0 (Background):** Pure White (#FFFFFF).
*   **Level 1 (Cards/Surface):** White with a 1px border (#E2E8F0) and a very soft, diffused shadow (Blur: 8px, Y: 4px, Opacity: 4% Black).
*   **Level 2 (Hover/Active):** Slightly more pronounced shadow (Blur: 16px, Y: 8px, Opacity: 8% Black) to indicate interactivity.
*   **Level 3 (Modals/Overlays):** Distinct elevation with a backdrop blur (12px) to maintain context while focusing the user's attention.

Avoid using shadows for flat elements like buttons or input fields; use subtle border-color changes instead.

## Shapes

The design system uses **Soft (Level 1)** roundedness. This 4px base radius (0.25rem) provides a clean, professional look that feels modern without appearing overly "bubbly" or casual.

*   **Standard Components:** 4px (Buttons, Inputs, Small Cards).
*   **Large Containers:** 8px (University Profile Cards, Modal Windows).
*   **Badges/Chips:** 100px (Pill-shaped) to distinguish status indicators from clickable buttons.

This subtle rounding reinforces the "trustworthy but contemporary" brand personality, maintaining a sharp, structured appearance.

## Components

The component library follows a **shadcn/ui-inspired** aesthetic: minimal, functional, and highly legible.

*   **Buttons:** Primary buttons use solid Academic Blue with white text. Secondary buttons use a 1px border with a subtle gray hover state. No gradients.
*   **Status Chips:** Essential for university matching. "Safe" uses Success Green (light tint background, dark text). "Reach" uses Aspire Gold (light tint background, dark text). 
*   **Input Fields:** Use 1px borders (#CBD5E1). On focus, the border shifts to Academic Blue with a subtle 2px outer glow (light blue tint).
*   **Academic Cards:** Used for university listings. Features a 1px border, 8px corner radius, and a structured layout with clear typography for tuition, location, and ranking.
*   **Progress Trackers:** Vertical "steppers" are used for application processes, utilizing Academic Blue for completed steps and a light gray for pending ones.
*   **Search Bars:** Large, prominent inputs with a 16px internal padding and a magnifying glass icon, serving as the primary entry point for the platform.