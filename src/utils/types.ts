// DTO для ингредиентов
export interface IngredientDTO {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}
export type TNewOrderResponse = TServerResponse<{
  order: TOrder;
  name: string;
}>;
type TServerResponse<T> = {
  success: boolean;
} & T;
export type TFeedsResponse = TServerResponse<{
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
}>;

// Тип данных, получаемых с API
export interface TIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v?: number;
}

export type TConstructorIngredient = TIngredient & {
  id: string;
  count: number;
};

export type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};
export type TOrderInfo = TOrder & {
  ingredientsInfo: Record<string, { count: number; ingredient: TIngredient }>;
  date: Date;
  total: number;
};
export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TUser = {
  email: string;
  name: string;
};

export type TTabMode = 'bun' | 'sauce' | 'main';
