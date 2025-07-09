import { TOrder } from '@utils-types';
import { FC } from 'react';
import { RootState, useSelector } from '../../services/store';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const feeds = useSelector((state: RootState) => state.order.feeds);
  const loading = useSelector((state: RootState) => state.order.loading);
  const error = useSelector((state: RootState) => state.order.error);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const readyOrders = getOrders(feeds?.orders || [], 'done');
  const pendingOrders = getOrders(feeds?.orders || [], 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{
        total: feeds?.total || 0,
        totalToday: feeds?.totalToday || 0
      }}
    />
  );
};
