import type { Config } from 'tailwindcss'
import { theme as themeCfg } from './config/theme'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './data/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}', // include pages if any
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: themeCfg.colors.brand,
          dark: themeCfg.colors.brandHover,
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)'
      },
      fontFamily: {
        heading: themeCfg.font.heading.split(','),
        body: themeCfg.font.body.split(','),
      }
    },
  },
  plugins: [],
}
export default config