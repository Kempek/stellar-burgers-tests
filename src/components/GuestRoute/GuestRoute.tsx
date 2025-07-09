import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface GuestRouteProps {
  isAuth: boolean;
  redirectTo: string;
  children: ReactNode;
}

export const GuestRoute: React.FC<GuestRouteProps> = ({
  isAuth = false,
  redirectTo,
  children
}) => (isAuth ? <Navigate to={redirectTo} replace /> : <>{children}</>);
