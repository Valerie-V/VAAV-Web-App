/** @type {import('tailwindcss').Config} */

// Theme colours that flip between the dark (default) and light sections are
// CSS variables, set in app/globals.css. Wrap a section in `theme-light` to
// switch it to white.
const themed = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        pattern: "url('/illustrations/patternBG.png')",
      },
      colors: {
        // Brand green, built around the original #0c6525 (brand-700).
        brand: {
          50: "#EEF8F0",
          100: "#D5EEDB",
          200: "#ABDDB8",
          300: "#7BD99A",
          400: "#3FBF6A",
          500: "#1E9E4C",
          600: "#117534",
          700: "#0C6525",
          800: "#0A501F",
          900: "#083F19",
          950: "#03210C",
        },
        // Brand dark grey.
        graphite: {
          50: "#F4F6F5",
          100: "#E6EAE8",
          200: "#CBD2CE",
          300: "#A9B4AE",
          400: "#7A8680",
          500: "#5A655F",
          600: "#434C47",
          700: "#2F3633",
          800: "#1F2422",
          900: "#161A18",
          950: "#0D100F",
        },
        canvas: themed("canvas"), // page background
        card: themed("card"), // raised panels
        surface: themed("surface"), // subtle fills inside panels
        ink: themed("ink"), // main text
        muted: themed("muted"), // secondary text
        line: themed("line"), // borders, always used with an opacity, e.g. ring-line/10
        pop: themed("pop"), // green text that reads well on the current background

        // Original names, kept so older class names still work.
        primary: "#0c6525",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(6%, -8%) scale(1.1)" },
          "66%": { transform: "translate(-5%, 6%) scale(0.95)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        bars: {
          "0%, 100%": { transform: "scaleY(0.35)" },
          "50%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(.2,.7,.2,1) both",
        float: "float 6s ease-in-out infinite",
        aurora: "aurora 18s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 6s linear infinite",
        "spin-slow": "spin 40s linear infinite",
        "spin-slower": "spin 70s linear infinite reverse",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0,0,.2,1) infinite",
        bars: "bars 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
