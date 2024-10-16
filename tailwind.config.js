/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        switzerFont: ["var(--font-switzer)"],
        switzerItalic: ["var(--font-switzer-italic)"],
        outfitFont: ["var(--font-outfit)"],
      },

      textColor: {
        primary: "#2563EB", // Primary Blue
        secondary: "#1D4ED8", // Dark Blue (Used for hover states)
        accent: "#60A5FA", // Light Blue (For accents)
        light: "#FFFFFF", // White
        muted: "#F9FAFB", // Gray 50 (Subtle background variations)
        dark: "#374151", // Gray 700
        darker: "#111827", // Gray 900 (Dark background)
      },
      backgroundColor: {
        primary: "#2563EB", // Primary Blue
        secondary: "#1D4ED8", // Dark Blue (Used for hover states)
        accent: "#60A5FA", // Light Blue (For accents)
        light: "#FFFFFF", // White
        muted: "#F9FAFB", // Gray 50 (Subtle background variations)
        dark: "#374151", // Gray 700
        darker: "#111827", // Gray 900 (Dark background)
      },
      borderColor: {
        primary: "#2563EB", // Primary Blue
        secondary: "#1D4ED8", // Dark Blue (Used for hover states)
        accent: "#60A5FA", // Light Blue (For accents)
        light: "#FFFFFF", // White
        muted: "#F9FAFB", // Gray 50 (Subtle background variations)
        dark: "#374151", // Gray 700
        darker: "#111827", // Gray 900 (Dark background)
      },
      ringColor: {
        primary: "#2563EB", // Primary Blue
        secondary: "#1D4ED8", // Dark Blue (Used for hover states)
        accent: "#60A5FA", // Light Blue (For accents)
        light: "#FFFFFF", // White
        muted: "#F9FAFB", // Gray 50 (Subtle background variations)
        dark: "#374151", // Gray 700
        darker: "#111827", // Gray 900 (Dark background)
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
