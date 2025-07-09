import { TIngredient } from '@utils-types';
import { forwardRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getBun, getIngredients } from '../../services/slices/constructorSlice';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { TIngredientsCategoryProps } from './type';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const bun = useSelector(getBun);
  const selectedIngredients = useSelector(getIngredients) || [];

  const ingredientsCounters = useMemo(() => {
    const counters: { [key: string]: number } = {};
    selectedIngredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun && bun._id) counters[bun._id] = 2;
    return counters;
  }, [bun, selectedIngredients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
