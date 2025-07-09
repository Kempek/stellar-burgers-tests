import clsx from 'clsx';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes.enum';
import styles from './profile-menu.module.css';
import { ProfileMenuUIProps } from './type';

export const ProfileMenuUI: FC<ProfileMenuUIProps> = ({
  pathname,
  handleLogout
}) => (
  <>
    <NavLink
      to={ROUTES.PROFILE}
      className={({ isActive }) =>
        clsx(
          'text text_type_main-medium text_color_inactive pt-4 pb-4',
          styles.link,
          { [styles.link_active]: isActive }
        )
      }
      end
    >
      Профиль
    </NavLink>

    <NavLink
      to={ROUTES.PROFILE_ORDERS}
      className={({ isActive }) =>
        clsx(
          'text text_type_main-medium text_color_inactive pt-4 pb-4',
          styles.link,
          { [styles.link_active]: isActive }
        )
      }
    >
      История заказов
    </NavLink>

    <button
      className={clsx(
        'text text_type_main-medium text_color_inactive pt-4 pb-4',
        styles.button
      )}
      onClick={handleLogout}
    >
      Выход
    </button>

    <p className='pt-20 text text_type_main-default text_color_inactive'>
      {pathname === ROUTES.PROFILE
        ? 'В этом разделе вы можете изменить свои персональные данные'
        : 'В этом разделе вы можете просмотреть свою историю заказов'}
    </p>
  </>
);
