import { FC, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { TIngredient } from '@utils-types';
import { RootState } from '../../services/store';
import { OrderCardUI } from '../ui/order-card';
import { OrderCardProps } from './type';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();

  const ingredients: TIngredient[] = useSelector(
    (state: RootState) => state.ingredients.items
  );

  const ingredientsMap = useMemo(
    () =>
      ingredients.reduce(
        (acc, ingredient) => {
          acc[ingredient._id] = ingredient;
          return acc;
        },
        {} as Record<string, TIngredient>
      ),
    [ingredients]
  );

  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        const ingredient = ingredientsMap[item];
        if (ingredient) return [...acc, ingredient];
        return acc;
      },
      []
    );

    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    const date = new Date(order.createdAt);
    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredientsMap]);

  if (!orderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location.pathname }}
    />
  );
});
