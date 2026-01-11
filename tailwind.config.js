/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'b-pink': '#ff6ec4',
        'b-purple': '#7873f5',
        'b-rose': '#ff4e91', 
        'deep-pink': '#FF1493',
        'soft-purple': '#8A2BE2',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'pacifico': ['Pacifico', 'cursive'],
      },
      backgroundImage: {
        'stripes': 'repeating-linear-gradient(45deg, #FFC107, #FFC107 5px, #FFCA28 5px, #FFCA28 10px)',
      },
      animation: {
        'float-up': 'floatUp 1s ease-out forwards',
        'flicker': 'flicker 0.1s infinite alternate',
        'bounce-in': 'bounceIn 0.8s cubic-bezier(0.8, 0, 1, 1)',
        'zoom-in': 'zoomIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translate(-50%, 0) scale(1)', opacity: 1 },
          '100%': { transform: 'translate(-50%, -20px) scale(0.5)', opacity: 0 },
        },
        flicker: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(1.1)', opacity: 0.8 },
        },
        bounceIn: {
          '0%': { opacity: 0, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        zoomIn: {
          '0%': { opacity: 0, transform: 'scale(0.5)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}