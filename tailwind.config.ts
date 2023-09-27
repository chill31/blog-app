import type { Config } from 'tailwindcss'
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent": "#3F51B5",
      },
      fontSize: {
        "h1": "3.9rem",
        "h2": "2.4rem",
        "h3": "1.9rem",
      },
    },
  },
  plugins: [nextui(), require('@tailwindcss/typography')],
}
export default config
