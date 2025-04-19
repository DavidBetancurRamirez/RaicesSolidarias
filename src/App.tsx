import { BrowserRouter, Route, RouteProps, Routes } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';

import Layout from '@components/Layout';

import Home from '@pages/Home';

import { WEB_ROUTES } from '@utils/routes';
import NotFound from '@pages/NotFound';

export const routes: RouteProps[] = [
  {
    Component: Home,
    path: WEB_ROUTES.about,
  },
  {
    Component: Home,
    path: WEB_ROUTES.contact,
  },
  {
    Component: Home,
    path: WEB_ROUTES.delivery,
  },
  {
    Component: Home,
    path: WEB_ROUTES.deliveries,
  },
  {
    Component: Home,
    path: WEB_ROUTES.home,
  },
  {
    Component: NotFound,
    path: '*',
  },
];

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
