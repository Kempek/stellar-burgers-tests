import { IngredientDTO, TIngredient } from '@utils-types';

export const mapIngredients = (data: IngredientDTO[]): TIngredient[] =>
  data.map((item) => ({
    _id: item._id,
    name: item.name,
    type: item.type,
    proteins: item.proteins,
    fat: item.fat,
    carbohydrates: item.carbohydrates,
    calories: item.calories,
    price: item.price,
    image: item.image,
    image_mobile: item.image_mobile,
    image_large: item.image_large,
    __v: item.__v ?? 0
  }));
