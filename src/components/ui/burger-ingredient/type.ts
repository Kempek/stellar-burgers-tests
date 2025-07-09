import type { TIngredient } from '@utils-types';

export type TBurgerIngredientUIProps = {
  ingredient: TIngredient;
  count?: number;
  locationState: { background: string };
  handleAdd: () => void;
};
