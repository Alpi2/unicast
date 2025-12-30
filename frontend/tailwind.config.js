import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--color-destructive)",
          foreground: "var(--color-destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--color-popover)",
          foreground: "var(--color-popover-foreground)",
        },
        card: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-card-foreground)",
        },
        success: {
          DEFAULT: "var(--color-success)",
          foreground: "var(--color-success-foreground)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          foreground: "var(--color-warning-foreground)",
        },
        error: {
          DEFAULT: "var(--color-error)",
          foreground: "var(--color-error-foreground)",
        },
        surface: "var(--color-surface)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-interactive": "var(--color-text-interactive)",
        "electric-blue": "#3b82f6",
        "bright-cyan": "#06b6d4",
        "vibrant-purple": "#8b5cf6",
        "bright-magenta": "#ec4899",
        "bright-yellow": "#fbbf24",
        "dark-navy": "#0f172a",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["Source Serif 4", "serif"],
        caption: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "fluid-xs": "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
        "fluid-sm": "clamp(0.875rem, 0.8rem + 0.375vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 1rem + 0.625vw, 1.25rem)",
        "fluid-xl": "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)",
        "fluid-2xl": "clamp(1.5rem, 1.3rem + 1vw, 1.875rem)",
        "fluid-3xl": "clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem)",
        "fluid-4xl": "clamp(2.25rem, 1.9rem + 1.75vw, 3rem)",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 1.5s infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite alternate",
        "stagger-fade-in": "staggerFadeIn 0.6s ease-out forwards",
        "slide-down": "slideDown 0.8s cubic-bezier(0.23, 1, 0.320, 1) forwards",
        morph: "morph 0.6s cubic-bezier(0.23, 1, 0.320, 1)",
        liquid: "liquid 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
            opacity: "0",
          },
          "10%": { opacity: "1" },
          "50%": {
            transform: "translateY(-100px) rotate(180deg)",
            opacity: "0.8",
          },
          "90%": { opacity: "1" },
        },
        "pulse-glow": {
          from: {
            opacity: "0.3",
            transform: "scale(1)",
          },
          to: {
            opacity: "0.8",
            transform: "scale(1.02)",
          },
        },
        staggerFadeIn: {
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideDown: {
          to: {
            transform: "translateY(0)",
          },
        },
        morph: {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "50%": { transform: "scale(1.1) rotate(180deg)" },
          "100%": { transform: "scale(1) rotate(360deg)" },
        },
        liquid: {
          "0%": { transform: "scale(1) skew(0deg)" },
          "25%": { transform: "scale(1.02) skew(0.5deg)" },
          "50%": { transform: "scale(1.05) skew(0deg)" },
          "75%": { transform: "scale(1.02) skew(-0.5deg)" },
          "100%": { transform: "scale(1) skew(0deg)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        "neumorphism-inset": "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
        "neumorphism-outset": "0 2px 4px rgba(0, 0, 0, 0.1)",
        "contextual-glow": "0 0 0 2px rgba(6, 182, 212, 0.4)",
        "electric-glow": "0 10px 25px rgba(59, 130, 246, 0.3)",
        "purple-glow": "0 10px 25px rgba(139, 92, 246, 0.3)",
        "cyan-glow": "0 10px 25px rgba(6, 182, 212, 0.3)",
        "yellow-glow": "0 10px 25px rgba(251, 191, 36, 0.3)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
        "gradient-accent": "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
        particles:
          "radial-gradient(circle, rgba(6, 182, 212, 0.1) 1px, transparent 1px)",
      },
      transform: {
        "3d": "perspective(1000px)",
      },
      transformStyle: {
        "3d": "preserve-3d",
      },
    },
  },
  plugins: [animate],
};
