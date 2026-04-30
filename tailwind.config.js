/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mango: {
          ripe: "#FFC324",
          "ripe-deep": "#F4BB44",
          "ripe-dark": "#E6A800",
          raw: "#4A7C59",
          "raw-light": "#6BAE7A",
          "raw-dark": "#2D5A3D",
          "raw-pale": "#90EE90",
          orange: "#FF8C00",
          "orange-light": "#FFB347",
          cream: "#FFF8E7",
          leaf: "#2E7D32",
          gold: "#FFD700",
          brown: "#8B4513",
        },
        brand: {
          primary: "#FFC324",
          secondary: "#4A7C59",
          accent: "#FF8C00",
          dark: "#1A1A1A",
          light: "#FAFAFA",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        bengali: ["'Hind Siliguri'", "sans-serif"],
        accent: ["'Cormorant Garamond'", "serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "rotate-slow": "rotate 20s linear infinite",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        "fade-in": "fadeIn 0.8s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
        "shimmer": "shimmer 2s linear infinite",
        "bounce-soft": "bounceSoft 2s ease-in-out infinite",
        "spin-slow": "spin 10s linear infinite",
        "marquee": "marquee 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-15px) rotate(2deg)" },
          "66%": { transform: "translateY(-8px) rotate(-1deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,195,36,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(255,195,36,0.8), 0 0 60px rgba(255,195,36,0.4)" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "mango-gradient": "linear-gradient(135deg, #FFC324 0%, #FF8C00 50%, #4A7C59 100%)",
        "ripe-gradient": "linear-gradient(135deg, #FFF8E7 0%, #FFC324 50%, #F4BB44 100%)",
        "raw-gradient": "linear-gradient(135deg, #E8F5E9 0%, #4A7C59 50%, #2D5A3D 100%)",
      },
      boxShadow: {
        "mango": "0 20px 60px rgba(255,195,36,0.3)",
        "mango-lg": "0 30px 80px rgba(255,195,36,0.4)",
        "green": "0 20px 60px rgba(74,124,89,0.3)",
        "card": "0 4px 30px rgba(0,0,0,0.08)",
        "card-hover": "0 20px 60px rgba(0,0,0,0.15)",
        "3d": "8px 8px 0px rgba(0,0,0,0.15)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      screens: {
        xs: "380px",
      },
    },
  },
  plugins: [],
};
