import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── IceCap Brand Palette ──────────────────────────────────────────
        'icecap-navy':       '#0A1628',   // primary background, hero sections
        'icecap-gold':       '#C9A84C',   // primary accent, CTAs, highlights
        'icecap-gold-light': '#E8C97A',   // hover states, secondary gold
        'icecap-slate':      '#1E2D45',   // card backgrounds, secondary surfaces
        'icecap-steel':      '#2E4460',   // borders, dividers
        'icecap-white':      '#F8F9FA',   // body text on dark
        'icecap-muted':      '#8B9BAE',   // secondary text, labels
        'icecap-success':    '#22C55E',   // approved, clear to close
        'icecap-warning':    '#F59E0B',   // conditions pending, in review
        'icecap-danger':     '#EF4444',   // suspended, action required

        // ── shadcn/ui CSS Variable Aliases ────────────────────────────────
        border:     'hsl(var(--border))',
        input:      'hsl(var(--input))',
        ring:       'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },

      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-jetbrains-mono)', 'Menlo', 'monospace'],
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'gold-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.4)' },
          '50%':       { boxShadow: '0 0 0 8px rgba(201,168,76,0)' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
        'fade-in':        'fade-in 0.4s ease-out',
        'gold-pulse':     'gold-pulse 2s ease-in-out infinite',
      },

      backgroundImage: {
        'gold-gradient':    'linear-gradient(135deg, #C9A84C 0%, #E8C97A 100%)',
        'navy-gradient':    'linear-gradient(180deg, #0A1628 0%, #1E2D45 100%)',
        'card-gradient':    'linear-gradient(145deg, #1E2D45 0%, #0A1628 100%)',
        'hero-radial':      'radial-gradient(ellipse at top right, rgba(201,168,76,0.08) 0%, transparent 60%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
