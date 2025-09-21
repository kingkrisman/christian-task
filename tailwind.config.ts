import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom colors from the design
        brand: {
          dark: "#1C1D22",
          gray: {
            50: "rgba(28, 29, 34, 0.04)",
            100: "rgba(28, 29, 34, 0.06)",
            200: "rgba(28, 29, 34, 0.08)",
            300: "rgba(28, 29, 34, 0.10)",
            400: "rgba(28, 29, 34, 0.12)",
            500: "rgba(28, 29, 34, 0.50)",
          },
          success: "#78D700",
          orange: "#FFA048",
          red: "#FF7979",
          blue: "#888DA7",
        },
        // Dark mode colors from Figma design - proper nested structure
        dark: {
          primary: "#2A2B2F", // Main background
          secondary: "#222327", // Sidebar background
          tertiary: "#24262C", // Column background
          card: "#292B31", // Task card background
          border: "rgba(255, 255, 255, 0.1)",
          "border-light": "rgba(255, 255, 255, 0.06)",
          text: {
            DEFAULT: "#FFFFFF",
            secondary: "rgba(255, 255, 255, 0.5)",
            muted: "rgba(255, 255, 255, 0.3)",
          },
          accent: {
            DEFAULT: "rgba(255, 255, 255, 0.04)",
            light: "rgba(255, 255, 255, 0.02)",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "slide-in-from-top": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-from-bottom": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-from-left": {
          "0%": { transform: "translateX(-10px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-from-right": {
          "0%": { transform: "translateX(10px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.95)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "slide-progress": {
          "0%": { transform: "translateX(-100%) skewX(-12deg)" },
          "100%": { transform: "translateX(300%) skewX(-12deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-3px)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(120, 215, 0, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(120, 215, 0, 0.6)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-from-top": "slide-in-from-top 0.2s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.2s ease-out",
        "slide-in-from-left": "slide-in-from-left 0.2s ease-out",
        "slide-in-from-right": "slide-in-from-right 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "scale-out": "scale-out 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        "slide-progress": "slide-progress 3s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
      scrollbar: {
        thin: "thin",
      },
      fontFamily: {
        sans: ["Exo 2", "system-ui", "sans-serif"],
        display: ["Exo 2", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0px 8px 6px 0px rgba(28, 29, 34, 0.06)",
        card: "6px 20px 36px 0px rgba(28, 29, 34, 0.10)",
        sidebar: "40px 180px 80px rgba(28, 29, 34, 0.06)",
        glow: "0 0 20px rgba(120, 215, 0, 0.3)",
        "glow-blue": "0 0 20px rgba(59, 130, 246, 0.3)",
        "glow-orange": "0 0 20px rgba(251, 146, 60, 0.3)",
        "glow-red": "0 0 20px rgba(239, 68, 68, 0.3)",
        "dark-card":
          "0px -2px 4px 0px rgba(255, 255, 255, 0.04) inset, 6px 20px 36px 0px rgba(28, 29, 34, 0.60)",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionDuration: {
        "2000": "2000ms",
        "3000": "3000ms",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        shimmer:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "100": "25rem",
        "112": "28rem",
        "128": "32rem",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Custom plugin for utilities
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".animate-in": {
          animationName: "fade-in, scale-in",
          animationDuration: "0.2s",
          animationTimingFunction: "ease-out",
          animationFillMode: "both",
        },
        ".animate-out": {
          animationName: "fade-out, scale-out",
          animationDuration: "0.2s",
          animationTimingFunction: "ease-in",
          animationFillMode: "both",
        },
        ".slide-in-from-top-2": {
          animationName: "slide-in-from-top",
          animationDuration: "0.2s",
          animationTimingFunction: "ease-out",
          animationFillMode: "both",
        },
        ".glass": {
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        },
        ".glass-dark": {
          background: "rgba(28, 29, 34, 0.9)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(28, 29, 34, 0.12) transparent",
        },
        ".scrollbar-none": {
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
} satisfies Config;
