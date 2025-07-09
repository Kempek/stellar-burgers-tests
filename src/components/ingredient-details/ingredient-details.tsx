import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '../../services/store';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';

export const IngredientDetails: FC = () => {
  const { id } = useParams();

  const ingredientData = useSelector((state: RootState) =>
    state.ingredients.items.find((item) => item._id === id)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
