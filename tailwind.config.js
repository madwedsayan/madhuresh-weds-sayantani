/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cinzel"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        hindi: ['"Tiro Devanagari Hindi"', 'serif'],
        bangla: ['"Tiro Bangla"', 'serif'],
        script: ['"Pinyon Script"', 'cursive'],
      },
      colors: {
        ink: 'var(--ink)',
        paper: 'var(--paper)',
        gold: 'var(--gold)',
        goldlight: 'var(--gold-light)',
        sindoor: 'var(--sindoor)',
        maroon: 'var(--maroon)',
        accent: 'var(--accent)',
      },
    },
  },
  plugins: [],
}
