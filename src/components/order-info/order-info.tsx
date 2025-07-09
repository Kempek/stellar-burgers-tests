import { TIngredient } from '@utils-types';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrderByNumber } from '../../services/actions/orderActions';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { OrderInfoUI } from '../ui/order-info';
import { Preloader } from '../ui/preloader';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const orderData = useSelector((state: RootState) => state.order.orderData);
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.items
  );
  const loading = useSelector((state: RootState) => state.order.loading);
  const error = useSelector((state: RootState) => state.order.error);

  useEffect(() => {
    if (number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
  }, [dispatch, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item: string) => {
        const ingredient = ingredients.find((ing) => ing._id === item);

        if (ingredient) {
          if (!acc[item]) {
            acc[item] = { ...ingredient, count: 1 };
          } else {
            acc[item].count++;
          }
        }

        return acc;
      },
      {} as TIngredientsWithCount
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc: number, item) =>
        acc +
        (item as TIngredient & { count: number }).price *
          (item as TIngredient & { count: number }).count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
