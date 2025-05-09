import withMT from '@material-tailwind/react/utils/withMT';
import scrollbar from 'tailwind-scrollbar';

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* Default Theme */
        accent: '#E6A700',
        background: '#FFF8F0',
        card: '#FDE7C1',
        primary: '#F57C00',
        text: '#6D4C41',

        /* Dark theme */
        dk_accent: '#F5B000',
        dk_background: '#423630',
        // dk_background: '#3A3A3A',
        dk_card: '#5A4038',
        dk_primary: '#CC6200',
        dk_text: '#E6D6CC',
      },
    },
  },
  plugins: [scrollbar({ nocompatible: true })],
});
