/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-bg": {
          start: "#041a0f",
          end: "#0b331e",
        },
        mimpex: {
          green: {
            DEFAULT: "#047857",
            dark: "#065f46",
            light: "#ecfdf5",
            muted: "#10b981",
          },
          red: {
            DEFAULT: "#b91c1c",
            dark: "#991b1b",
            light: "#fef2f2",
          },
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #041a0f 0%, #0b331e 100%)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        bengali: ["var(--font-noto-bengali)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(4, 120, 87, 0.08)",
        "card-hover": "0 16px 48px rgba(4, 120, 87, 0.14)",
        float: "0 20px 50px rgba(0, 0, 0, 0.18)",
        nav: "0 1px 3px rgba(4, 120, 87, 0.08)",
      },
    },
  },
  plugins: [],
};
