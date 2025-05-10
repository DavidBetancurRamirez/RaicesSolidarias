import { BrowserRouter, Route, RouteProps, Routes } from 'react-router-dom';

import Layout from '@components/Layout';

import About from '@pages/About';
import Contact from '@pages/Contact';
import Deliveries from '@pages/Deliveries';
import Delivery from '@pages/Delivery';
import Home from '@pages/Home';
import NotFound from '@pages/NotFound';

import { WEB_ROUTES } from '@utils/routes';
import { ThemeProvider } from '@material-tailwind/react';
import Session from '@pages/Session';

export const routes: RouteProps[] = [
  {
    Component: About,
    path: WEB_ROUTES.about,
  },
  {
    Component: Contact,
    path: WEB_ROUTES.contact,
  },
  {
    Component: Deliveries,
    path: WEB_ROUTES.deliveries,
  },
  {
    Component: Delivery,
    path: WEB_ROUTES.delivery,
  },
  {
    Component: Home,
    path: WEB_ROUTES.home,
  },
  {
    Component: Session,
    path: WEB_ROUTES.session,
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
