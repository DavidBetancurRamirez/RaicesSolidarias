import { RouteProps } from 'react-router-dom';

import DeliveryForm from '@components/deliveries/DeliveryForm';
import PlaceForm from '@components/places/PlaceForm';

import { UserRoles } from './roles';

import About from '@pages/About';
import AdminLayout from '@pages/AdminLayout';
import Contact from '@pages/Contact';
import Deliveries from '@pages/Deliveries';
import Delivery from '@pages/Delivery';
import Home from '@pages/Home';
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
    Component: Home,
    path: WEB_ROUTES.home,
  },
  {
    Component: Place,
    path: WEB_ROUTES.place,
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

export type PrivateRouteProps = Omit<RouteProps, 'children'> & {
  children?: PrivateRouteProps[];
  requiredRoles: UserRoles[];
};

export const privateRoutes: PrivateRouteProps[] = [
  {
    children: [
      {
        Component: DeliveryForm,
        path: WEB_ROUTES.adminDeliveries,
        requiredRoles: [UserRoles.ADMIN],
      },
      {
        Component: DeliveryForm,
        path: WEB_ROUTES.adminDelivery,
        requiredRoles: [UserRoles.ADMIN],
      },
      {
        Component: PlaceForm,
        path: WEB_ROUTES.adminPlaces,
        requiredRoles: [UserRoles.ADMIN],
      },
      {
        Component: PlaceForm,
        path: WEB_ROUTES.adminPlace,
        requiredRoles: [UserRoles.ADMIN],
      },
    ],
    Component: AdminLayout,
    path: WEB_ROUTES.admin,
    requiredRoles: [UserRoles.ADMIN],
  },
  {
    Component: Profile,
    path: WEB_ROUTES.profile,
    requiredRoles: [UserRoles.ADMIN, UserRoles.USER],
  },
];
