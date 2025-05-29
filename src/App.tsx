import { createElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';

import Layout from '@components/common/Layout';
import PrivateRoute from '@components/common/PrivateRoute';

import { publicRoutes, privateRoutes } from './constants/routes';

import { API_BASE_URL } from '@utils/routes';

const App = () => {
  console.log('API_BASE_URL environment:', import.meta.env.VITE_API_URL);
  console.log('API_BASE_URL saved:', API_BASE_URL);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {publicRoutes.map((route) => (
              <Route key={route.path} {...route} />
            ))}

            {privateRoutes.map(({ path, Component, requiredRoles }) => (
              <Route
                key={path}
                path={path}
                element={
                  <PrivateRoute requiredRoles={requiredRoles}>
                    {Component ? createElement(Component) : null}
                  </PrivateRoute>
                }
              />
            ))}
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
