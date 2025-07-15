import { TIngredient } from '@utils-types';
import reducer from '../ingredientsSlice';

const INITIAL_STATE = {
  items: [],
  isLoading: false,
  error: null
};

const MOCK_INGREDIENTS: TIngredient[] = [
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

const MOCK_ERROR_MESSAGE = 'Ошибка загрузки ингредиентов';

describe('ingredientsSlice', () => {
  it('возвращает initialState по умолчанию', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(INITIAL_STATE);
  });

  it('устанавливает isLoading=true при fetchIngredients.pending', () => {
    const action = { type: 'ingredients/fetchAll/pending' };
    const state = reducer(INITIAL_STATE, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('записывает ингредиенты при fetchIngredients.fulfilled', () => {
    const action = {
      type: 'ingredients/fetchAll/fulfilled',
      payload: MOCK_INGREDIENTS
    };
    const state = reducer(INITIAL_STATE, action);
    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(MOCK_INGREDIENTS);
  });

  it('записывает ошибку при fetchIngredients.rejected', () => {
    const action = {
      type: 'ingredients/fetchAll/rejected',
      error: { message: MOCK_ERROR_MESSAGE }
    };
    const state = reducer(INITIAL_STATE, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(MOCK_ERROR_MESSAGE);
  });
});
