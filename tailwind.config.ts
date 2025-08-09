
import type { Config } from 'tailwindcss'
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6A30FF',
        },
      },
      borderRadius: {
        'xl2': '1.25rem'
      }
    },
  },
  plugins: [],
}
export default config
