import { RouteProps } from 'react-router-dom';

import { UserRoles } from './roles';

import About from '@pages/About';
import Admin from '@pages/Admin';
import Contact from '@pages/Contact';
import Deliveries from '@pages/Deliveries';
import Delivery from '@pages/Delivery';
// import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import Place from '@pages/Place';
import Profile from '@pages/Profile';
import Session from '@pages/Session';

import { WEB_ROUTES } from '@utils/routes';

export const publicRoutes: RouteProps[] = [
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
    // Component: Home,
    Component: Deliveries,
    path: WEB_ROUTES.home,
  },
  {
    Component: Place,
    path: WEB_ROUTES.place,
  },
  {
    Component: Profile,
    path: WEB_ROUTES.profile,
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

type PrivateRouteProps = RouteProps & {
  requiredRoles: UserRoles[];
};

export const privateRoutes: PrivateRouteProps[] = [
  {
    Component: Admin,
    path: WEB_ROUTES.admin,
    requiredRoles: [UserRoles.ADMIN],
  },
];
