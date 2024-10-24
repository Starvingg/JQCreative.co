const defaultTheme = require("tailwindcss/defaultTheme");
const svgToDataUri = require("mini-svg-data-uri");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

// Define the function at the top
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

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
  			outfitFont: ["var(--font-outfit)"]
  		},
  		textColor: {
  			primary: '#2563EB',
  			secondary: '#1D4ED8',
  			accent: '#60A5FA',
  			light: '#FFFFFF',
  			muted: '#F9FAFB',
  			dark: '#374151',
  			darker: '#111827'
  		},
  		backgroundColor: {
  			primary: '#2563EB',
  			secondary: '#1D4ED8',
  			accent: '#60A5FA',
  			light: '#FFFFFF',
  			muted: '#F9FAFB',
  			dark: '#374151',
  			darker: '#111827'
  		},
  		borderColor: {
  			primary: '#2563EB',
  			secondary: '#1D4ED8',
  			accent: '#60A5FA',
  			light: '#FFFFFF',
  			muted: '#F9FAFB',
  			dark: '#374151',
  			darker: '#111827'
  		},
  		ringColor: {
  			primary: '#2563EB',
  			secondary: '#1D4ED8',
  			accent: '#60A5FA',
  			light: '#FFFFFF',
  			muted: '#F9FAFB',
  			dark: '#374151',
  			darker: '#111827'
  		},
  		animation: {
  			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear'
  		},
  		keyframes: {
  			'border-beam': {
  				'100%': {
  					'offset-distance': '100%'
  				}
  			}
  		}
  	}
  },
  plugins: [
    // Use the function in the plugins array
    addVariablesForColors,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-grid": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
    require("tailwindcss-animate"), // Other plugins
  ],
};
