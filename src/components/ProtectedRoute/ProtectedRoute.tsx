import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState, useSelector } from '../../services/store';

interface ProtectedRouteProps {
  isAuth: boolean;
  redirectTo: string;
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  isAuth,
  redirectTo,
  children
}) => {
  const location = useLocation();
  const authChecked = useSelector((state: RootState) => state.auth.authChecked);

  if (!authChecked) return null; // ⏳ Пока не проверили авторизацию — ничего не показываем

  return isAuth ? (
    <>{children}</>
  ) : (
    <Navigate to={redirectTo} replace state={{ from: location }} />
  );
};
