import { BurgerIngredientUI } from '@ui';
import { TIngredient } from '@utils-types';
import { FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addIngredient, setBun } from '../../services/slices/constructorSlice';

export const BurgerIngredient: FC<{ ingredient: TIngredient; count?: number }> =
  memo(({ ingredient, count = 0 }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(setBun(ingredient));
      } else {
        dispatch(
          addIngredient({
            ...ingredient,
            id: crypto.randomUUID(),
            count: 1
          })
        );
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location.pathname }}
        handleAdd={handleAdd}
      />
    );
  });
