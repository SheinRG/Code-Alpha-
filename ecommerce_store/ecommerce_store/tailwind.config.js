module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#059669', // Primary - emerald-600
        'primary-light': '#10b981', // Primary Light - emerald-500
        'primary-dark': '#047857', // Primary Dark - emerald-700
        'background': '#FFFFFF', // Background - white
        'surface': '#F9FAFB', // Surface - gray-50
        'border': '#E5E7EB', // Border - gray-200
        'subtle': '#9CA3AF', // Subtle - gray-400
        'text-muted': '#6B7280', // Text Muted - gray-500
        'text-primary': '#374151', // Text Primary - gray-700
        'text-dark': '#111827', // Text Dark - gray-900
        'success': '#16A34A', // Success - green-600
        'warning': '#F59E0B', // Warning - amber-500
        'error': '#DC2626', // Error - red-600
        'info': '#2563EB', // Info - blue-600
        'sale': '#E11D48', // Sale - rose-600
      },
      fontFamily: {
        'heading': ['Montserrat', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'accent': ['Playfair Display', 'serif'],
      },
      fontSize: {
        'display': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'h1': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.5', fontWeight: '500' }],
        'subtitle': ['1.125rem', { lineHeight: '1.6', fontWeight: '500' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
        'price': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.15s ease-in-out',
        'slide-down': 'slideDown 0.2s ease-out',
        'scale-up': 'scaleUp 0.15s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}