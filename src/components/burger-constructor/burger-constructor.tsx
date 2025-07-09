import { BurgerConstructorUI } from '@ui';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearConstructor,
  getBun,
  getIngredients,
  getOrderModalData,
  getOrderRequest
} from '../../services/slices/constructorSlice';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const bun = useSelector(getBun);
  const ingredients = useSelector(getIngredients) || [];
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);

  const price = useMemo(() => {
    const bunPrice = bun?.price ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum, item) => sum + (item?.price || 0),
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const onOrderClick = () => {
    if (!bun || orderRequest) return;
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
