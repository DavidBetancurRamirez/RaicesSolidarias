import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {},
  plugins: [],
});
