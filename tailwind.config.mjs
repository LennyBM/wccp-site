/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // === BRAND NAVY / YELLOW / WHITE PALETTE (2026) ===
        //
        // Industrial trade-show brand colours. Deep navy surfaces + ink,
        // off-white/white page backgrounds, raw electric blue reserved for
        // the logo lockup, raw brand yellow as the sole CTA / accent.
        // The legacy `forest`, `terracotta`, `cream`, `ember` tokens are
        // remapped onto the new palette so existing class usage updates
        // automatically across the site.

        // === PRIMARY BRAND TOKENS (real client swatches, 2026) ===
        // navy.700 (#3a5cb5)  — brand cobalt: surfaces, accents, base navy
        // yellow.400 (#fff005) — vivid brand yellow: ONLY on dark surfaces
        // navy.900 (#131e44)  — body text on white (13:1 AAA)
        // navy.800 (#1f2f6a)  — headlines on white (7.5:1 AAA)
        // navy.logo (#0000FE) — RAW electric blue: logo lockup only
        navy: {
          DEFAULT: '#3a5cb5',
          50:  '#EEF1FA',
          100: '#D4DCF1',
          200: '#A9B9E2',
          300: '#7E96D3',
          400: '#5374C4',
          500: '#3a5cb5',
          600: '#2e4796',         // hover/deeper
          700: '#3a5cb5',         // base — text-navy / bg-navy-700 (brand cobalt)
          800: '#1f2f6a',         // headlines on white (7.5:1)
          900: '#131e44',         // body text on white (13:1 ✓ AAA)
          logo: '#0000FE',        // PRESERVED — logo lockup only
          ink:  '#0A1226',        // deepest text-black-equivalent
        },
        yellow: {
          DEFAULT: '#fff005',     // raw brand yellow — vivid pure
          50:  '#FFFEF0',
          100: '#FFFCC2',
          200: '#FFF98A',
          300: '#fff64a',         // softer for dot pulses
          400: '#fff005',         // base — CTAs / eyebrows (DARK SURFACES ONLY)
          500: '#f5e600',         // hover slight darker
          600: '#D6C800',
          700: '#A89C00',
          800: '#6B6300',
          900: '#3A3600',
          logo: '#fff005',        // PRESERVED — logo lockup
        },

        // === LEGACY TOKEN REWIRES ===
        // Existing class usage (text-forest-700, bg-terracotta-600, etc.)
        // automatically resolves to the new navy/yellow palette.
        forest: {
          DEFAULT: '#3a5cb5',
          50:  '#EEF1FA',
          100: '#D4DCF1',
          200: '#A9B9E2',
          300: '#7E96D3',
          400: '#5374C4',
          500: '#3a5cb5',
          600: '#2e4796',
          700: '#3a5cb5',
          800: '#1f2f6a',
          900: '#131e44',
        },
        terracotta: {
          DEFAULT: '#fff005',
          50:  '#FFFEF0',
          100: '#FFFCC2',
          200: '#FFF98A',
          300: '#fff64a',
          400: '#fff005',
          500: '#fff005',
          600: '#f5e600',
          700: '#D6C800',
          800: '#A89C00',
          900: '#6B6300',
        },
        cream: {
          DEFAULT: '#FFFFFF',
          50:  '#FBFAF7',
          100: '#FFFFFF',         // pure white card / surface
          200: '#FBFAF7',
          300: '#F5F3ED',
          400: '#E8E5DC',
          500: '#C9C5B8',
          600: '#928E83',
          700: '#5C5950',
          800: '#2F2D27',
          900: '#16140F',
        },
        ember: {
          DEFAULT: '#fff005',
          50:  '#FFFEF0',
          100: '#FFFCC2',
          200: '#FFF98A',
          300: '#fff64a',
          400: '#fff005',
          500: '#fff005',
          600: '#f5e600',
          700: '#D6C800',
          800: '#A89C00',
          900: '#6B6300',
        },
        bone: {
          /* Page surface — soft off-white. Cards (pure #FFFFFF) sit visibly
             above this so they read as elevated. */
          DEFAULT: '#FBFAF7',
          50:  '#FFFFFF',
          100: '#FBFAF7',
          200: '#F5F3ED',
          300: '#E8E5DC',
          400: '#C9C5B8',
          500: '#928E83',
        },
        // Mid-greys — slightly cool/bluish for industrial feel
        cast: {
          DEFAULT: '#5C6470',
          50:  '#F1F2F4',
          100: '#DADDE2',
          200: '#BCC1C9',
          300: '#9DA4AF',
          400: '#7E8693',
          500: '#5C6470',
          600: '#494F5A',
          700: '#363B43',
          800: '#23272D',
          900: '#101317',
        },
        ink: {
          DEFAULT: '#0A1226',     // deepest text-black-equivalent
        },
        // System
        success: '#0E7A45',
        danger:  '#C0322B',
      },
      fontFamily: {
        // === EDITORIAL TYPOGRAPHY ===
        // Newsreader serif (NYT-coded, solid heritage-industrial) for display.
        // Fraunces kept as transitional fallback while CDN warms.
        // Inter for body text — unchanged.
        display: ['"Newsreader"', '"Fraunces Variable"', '"Fraunces"', '"Times New Roman"', 'Georgia', 'serif'],
        body:    ['"Inter Variable"', '"Inter"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-3xl': ['clamp(3.5rem, 6vw + 1rem, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.04em', fontWeight: '600' }],
        'display-2xl': ['clamp(3rem, 5vw + 1rem, 5.75rem)', { lineHeight: '0.98', letterSpacing: '-0.035em', fontWeight: '600' }],
        'display-xl':  ['clamp(2.5rem, 4vw + 0.5rem, 4.25rem)', { lineHeight: '1.0',  letterSpacing: '-0.03em',  fontWeight: '600' }],
        'display-lg':  ['clamp(2rem, 3vw + 0.5rem, 3.25rem)',  { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '600' }],
        'display-md':  ['clamp(1.5rem, 2vw + 0.5rem, 2.5rem)', { lineHeight: '1.06', letterSpacing: '-0.02em',  fontWeight: '600' }],
        'display-sm':  ['1.625rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }],
        'eyebrow':     ['0.75rem',  { lineHeight: '1.2', letterSpacing: '0.14em',   fontWeight: '600', textTransform: 'uppercase' }],
        'mono-label':  ['0.7rem',   { lineHeight: '1.2', letterSpacing: '0.06em',   fontWeight: '500' }],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        sm: '0.125rem',
        md: '0.25rem',
        lg: '0.5rem',
        xl: '0.875rem',
        '2xl': '1.25rem',
        full: '9999px',
      },
      spacing: {
        'gutter': '16px',
        'page-x': 'clamp(20px, 4vw, 64px)',
      },
      boxShadow: {
        'soft':    '0 4px 12px rgba(19, 30, 68, 0.10)',
        'pressed': '0 2px 4px rgba(19, 30, 68, 0.14)',
        'lifted':  '0 16px 40px rgba(19, 30, 68, 0.16)',
        'glow':    '0 0 32px rgba(255, 240, 5, 0.32)',
        'glow-ember': '0 0 32px rgba(255, 240, 5, 0.36)',
        'inset-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
      },
      maxWidth: {
        'prose-wide': '72ch',
        'screen-2xl': '1392px',
      },
      transitionTimingFunction: {
        'out-quart':  'cubic-bezier(0.25, 1, 0.5, 1)',
        'out-expo':   'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-cubic': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'spring':     'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '900': '900ms',
      },
      animation: {
        'fade-in':           'fadeIn 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in-up':        'fadeInUp 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in-down':      'fadeInDown 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-left':     'slideInLeft 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-right':    'slideInRight 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in':          'scaleIn 500ms cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'shimmer':           'shimmer 2.5s linear infinite',
        'marquee':           'marquee 60s linear infinite',
        'marquee-slow':      'marquee 90s linear infinite',
        'pulse-soft':        'pulseSoft 2.5s ease-in-out infinite',
        'underline-grow':    'underlineGrow 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'arrow-slide':       'arrowSlide 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'reveal-y':          'revealY 800ms cubic-bezier(0.65, 0, 0.35, 1) both',
        'badge-pop':         'badgePop 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'count-up':          'fadeInUp 800ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'hover-lift':        'hoverLift 280ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'gradient-pan':      'gradientPan 12s ease-in-out infinite',
        'spin-slow':         'spin 14s linear infinite',
        'subtle-float':      'subtleFloat 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:        { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeInUp:      { '0%': { opacity: '0', transform: 'translate3d(0, 24px, 0)' }, '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' } },
        fadeInDown:    { '0%': { opacity: '0', transform: 'translate3d(0, -24px, 0)' }, '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' } },
        slideInLeft:   { '0%': { opacity: '0', transform: 'translate3d(-32px, 0, 0)' }, '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' } },
        slideInRight:  { '0%': { opacity: '0', transform: 'translate3d(32px, 0, 0)' }, '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' } },
        scaleIn:       { '0%': { opacity: '0', transform: 'scale(0.92)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        shimmer:       { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        marquee:       { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        pulseSoft:     { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.65' } },
        underlineGrow: { '0%': { transform: 'scaleX(0)' }, '100%': { transform: 'scaleX(1)' } },
        arrowSlide:    { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(4px)' } },
        revealY:       { '0%': { clipPath: 'inset(100% 0 0 0)' }, '100%': { clipPath: 'inset(0 0 0 0)' } },
        badgePop:      { '0%': { opacity: '0', transform: 'scale(0.6) translateY(8px)' }, '60%': { transform: 'scale(1.06) translateY(0)' }, '100%': { opacity: '1', transform: 'scale(1) translateY(0)' } },
        hoverLift:     { '0%': { transform: 'translateY(0)' }, '100%': { transform: 'translateY(-4px)' } },
        gradientPan:   { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        subtleFloat:   { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
      },
    },
  },
  plugins: [],
};
