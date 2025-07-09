import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { AppHeaderUI } from '../../components/ui/app-header/app-header';

export const AppHeader: FC = () => {
  const location = useLocation();

  return <AppHeaderUI pathname={location.pathname} />;
};
