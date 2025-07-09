import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { fetchAllData, fetchOrders } from '../../services/actions/orderActions';
import { setLoading } from '../../services/slices/orderSlice';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { getCookie } from '../../utils/cookie';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state: RootState) => state.order.orders);
  const feeds = useSelector((state: RootState) => state.order.feeds);
  const loading = useSelector((state: RootState) => state.order.loading);
  const error = useSelector((state: RootState) => state.order.error);

  useEffect(() => {
    const token = getCookie('accessToken');
    dispatch(setLoading(true));

    if (token) {
      dispatch(fetchOrders());
    }

    dispatch(fetchAllData());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(setLoading(true));

    dispatch(fetchAllData())
      .then(() => {
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.error('Error fetching feeds:', error);
      });
  };

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const displayOrders = orders.length > 0 ? orders : feeds?.orders || [];

  return <FeedUI orders={displayOrders} handleGetFeeds={handleGetFeeds} />;
};
