import { ProfileMenuUI } from '@ui';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/actions/authActions';
import { clearAuth } from '../../services/slices/authSlice';
import { useDispatch } from '../../services/store';
import { deleteCookie } from '../../utils/cookie';
import { ROUTES } from '../../utils/routes.enum';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();

      deleteCookie('accessToken');
      deleteCookie('refreshToken');

      dispatch(clearAuth());

      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
