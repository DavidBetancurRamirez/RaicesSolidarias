import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Modo claro */
        accent: '#FFC107',
        background: '#FFF8F0',
        card: '#FDE7C1',
        primary: '#F57C00',
        text: '#6D4C41',

        /* Dark theme */
        dk_accent: '#FFCA28',
        dk_background: '#2E2E2E',
        dk_card: '#4E342E',
        dk_primary: '#FF9800',
        dk_text: '#D7CCC8',
      },
    },
  },
  plugins: [],
});
