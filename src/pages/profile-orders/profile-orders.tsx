import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { fetchOrders } from '../../services/actions/orderActions';
import { RootState, useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state: RootState) => state.order.orders);
  const loading = useSelector((state: RootState) => state.order.loading);
  const error = useSelector((state: RootState) => state.order.error);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
