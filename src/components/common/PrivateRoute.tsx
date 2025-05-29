import { Navigate } from 'react-router-dom';

import { UserRoles } from '@/constants/roles';

import { useAuthStore } from '@/stores/authStore';

interface Props {
  children: React.ReactNode;
  requiredRoles?: UserRoles[];
}

const PrivateRoute = ({ children, requiredRoles = [] }: Props) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    requiredRoles.length > 0 &&
    !requiredRoles.some((role) => user.roles.includes(role))
  ) {
    return <Navigate to="/404" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
