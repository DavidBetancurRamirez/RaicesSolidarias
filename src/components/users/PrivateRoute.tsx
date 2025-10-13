import { Navigate, useLocation } from 'react-router-dom';

import { UserRoles } from '@/constants/roles';

import { useAuthStore } from '@/stores/authStore';
import { WEB_ROUTES } from '@utils/routes';

interface Props {
  children: React.ReactNode;
  requiredRoles?: UserRoles[];
}

const PrivateRoute = ({ children, requiredRoles = [] }: Props) => {
  const location = useLocation();
  const { user } = useAuthStore();

  if (!user) {
    return (
      <Navigate to={WEB_ROUTES.session} state={{ from: location }} replace />
    );
  }

  if (
    requiredRoles.length > 0 &&
    !requiredRoles.some((role) => user.roles.includes(role))
  ) {
    return <Navigate to={WEB_ROUTES.notFound} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
