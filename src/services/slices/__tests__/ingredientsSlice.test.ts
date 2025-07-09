import { TIngredient } from '@utils-types';
import reducer from '../ingredientsSlice';

const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  }
];

const initialState = {
  items: [],
  isLoading: false,
  error: null
};

describe('ingredientsSlice', () => {
  it('возвращает initialState по умолчанию', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('устанавливает isLoading=true при fetchIngredients.pending', () => {
    const action = { type: 'ingredients/fetchAll/pending' };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('записывает ингредиенты при fetchIngredients.fulfilled', () => {
    const action = {
      type: 'ingredients/fetchAll/fulfilled',
      payload: mockIngredients
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
  });

  it('записывает ошибку при fetchIngredients.rejected', () => {
    const action = {
      type: 'ingredients/fetchAll/rejected',
      error: { message: 'Ошибка загрузки ингредиентов' }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ингредиентов');
  });
});
