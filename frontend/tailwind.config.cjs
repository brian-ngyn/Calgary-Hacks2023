/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'white': '#FAF9F6',
				'black': '#110B11',
				'accent': '#BE2A2C'
      },
			fontFamily: {
				Varela: "Varela"
			}
    },
  },
  plugins: [],
}
