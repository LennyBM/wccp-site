/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // === REFINED PREMIUM PALETTE ===
        //
        // The previous palette used the raw logo colours (#0000FE / #FBF547)
        // across the entire UI, which read as "construction signage" rather
        // than "premium industrial brand". This refinement keeps the exact
        // logo colours for the LOGO LOCKUP only, and uses richer, more
        // sophisticated digital UI tokens for everything else.
        //
        // Logo recognition is preserved. Premium feel is gained.

        // Primary brand — digital UI primary
        navy: {
          DEFAULT: '#0A1A4F',     // Premium deep navy — primary UI
          50:  '#E7EAF4',
          100: '#C2C9E2',
          200: '#9AA5CD',
          300: '#7080B7',
          400: '#4D5FA1',
          500: '#2E4185',
          600: '#1A2D6A',
          700: '#0A1A4F',         // base — premium navy
          800: '#06123A',
          900: '#030823',
          logo: '#0000FE',        // Exact logo colour — used ONLY on the logo lockup
          ink:  '#040A1F',        // Deepest tone for highest-contrast text
        },
        // Brand accent yellow
        yellow: {
          DEFAULT: '#F5C518',     // Refined warmer accent — more sophisticated than raw lemon
          50:  '#FEF9E5',
          100: '#FDF1BE',
          200: '#FAE693',
          300: '#F8DA68',
          400: '#F6CD3F',
          500: '#F5C518',         // base — refined warm yellow
          600: '#D2A509',
          700: '#9C7906',
          800: '#664E04',
          900: '#332702',
          logo: '#FBF547',        // Exact logo colour — only on the logo lockup
        },
        // CTA accent — refined ember
        ember: {
          DEFAULT: '#E54D17',     // More sophisticated than raw safety orange
          50:  '#FBE7DD',
          100: '#F4C0A8',
          200: '#ED9874',
          300: '#E66F40',
          400: '#E55C26',
          500: '#E54D17',         // base
          600: '#B83C0F',
          700: '#892C0A',
          800: '#5C1D06',
          900: '#2E0E03',
        },
        // Surfaces — warm neutral
        bone: {
          DEFAULT: '#FAFAF7',
          50:  '#FCFCFA',
          100: '#FAFAF7',         // base
          200: '#F1F0EA',
          300: '#E5E3DA',
          400: '#CECBBE',
          500: '#9C9888',
        },
        // Mid-greys — slightly cool/bluish for premium industrial feel
        cast: {
          DEFAULT: '#5C6470',
          50:  '#F1F2F4',
          100: '#DADDE2',
          200: '#BCC1C9',
          300: '#9DA4AF',
          400: '#7E8693',
          500: '#5C6470',         // base
          600: '#494F5A',
          700: '#363B43',
          800: '#23272D',
          900: '#101317',
        },
        ink: {
          DEFAULT: '#0A0E1A',     // Premium near-black with subtle blue
        },
        // System
        success: '#0E7A45',       // Refined trust green
        danger:  '#C0322B',       // Refined alert red
      },
      fontFamily: {
        // === REFINED PREMIUM TYPOGRAPHY ===
        // Bricolage Grotesque — modern industrial display, distinctive character,
        // free via Google Fonts. Has variable-width and optical sizing built in.
        // Inter — workhorse premium body font, ubiquitous quality, free via Google Fonts.
        // Together: industrial heritage + modern editorial premium feel.
        display: ['"Bricolage Grotesque Variable"', '"Bricolage Grotesque"', '"Inter Variable"', '"Inter"', 'system-ui', 'sans-serif'],
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
        'soft':    '0 4px 12px rgba(10, 26, 79, 0.06)',
        'pressed': '0 2px 4px rgba(10, 26, 79, 0.10)',
        'lifted':  '0 16px 40px rgba(10, 26, 79, 0.12)',
        'glow':    '0 0 32px rgba(245, 197, 24, 0.35)',
        'glow-ember': '0 0 32px rgba(229, 77, 23, 0.30)',
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
        /* Hover-only arrow nudge — applied via .arrow-float on .group:hover. Removed
           the previous infinite-alternate version which chewed battery on mobile. */
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
