import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';

import Home from './pages/Home';

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
