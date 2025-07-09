import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes.enum';
import styles from './app-header.module.css';
type TAppHeaderUIProps = {
  pathname?: string;
  userName?: string;
};

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({
  pathname = ROUTES.HOME,
  userName
}) => (
  <header className={styles.header}>
    <nav className={styles.menu}>
      <div className={styles.menu_part_left}>
        <Link to={ROUTES.HOME} className={styles.link}>
          <BurgerIcon
            type={pathname === ROUTES.HOME ? 'primary' : 'secondary'}
          />
          <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
        </Link>
        <Link to={ROUTES.FEED} className={styles.link}>
          <ListIcon type={pathname === ROUTES.FEED ? 'primary' : 'secondary'} />
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </Link>
      </div>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <Logo className={styles.logo} />
        </Link>
      </div>
      <div className={styles.link_position_last}>
        <Link to={ROUTES.PROFILE} className={styles.link}>
          <ProfileIcon
            type={pathname.startsWith(ROUTES.PROFILE) ? 'primary' : 'secondary'}
          />
          <p className='text text_type_main-default ml-2'>Личный кабинет</p>
        </Link>
      </div>
    </nav>
  </header>
);
