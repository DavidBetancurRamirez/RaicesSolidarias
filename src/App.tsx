import { createElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';

import Layout from '@components/layout/Layout';
import PrivateRoute from '@components/users/PrivateRoute';
import ScrollToTop from '@components/layout/ScrollToTop';

import {
  publicRoutes,
  privateRoutes,
  PrivateRouteProps,
} from './constants/routes';

const renderPrivateRoute = ({
  path,
  Component,
  requiredRoles,
  children,
}: PrivateRouteProps) => (
  <Route
    key={path}
    path={path}
    element={
      <PrivateRoute requiredRoles={requiredRoles}>
        {Component ? createElement(Component) : null}
      </PrivateRoute>
    }
  >
    {children?.map((child) => renderPrivateRoute(child))}
  </Route>
);

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            {publicRoutes.map((route) => (
              <Route key={route.path} {...route} />
            ))}

            {privateRoutes.map(renderPrivateRoute)}
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
