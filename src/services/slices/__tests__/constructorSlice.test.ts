import reducer, {
  addIngredient,
  clearConstructor,
  moveIngredient,
  removeIngredient,
  setBun,
  setOrderModalData,
  setOrderRequest
} from '../constructorSlice';

import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

// Фикстуры
const bun: TIngredient = {
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
};

const ingredient1: TConstructorIngredient = {
  id: '1',
  count: 1,
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
};

const ingredient2: TConstructorIngredient = {
  id: '2',
  count: 2,
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
};

const orderData: TOrder = {
  _id: 'order1',
  status: 'done',
  name: 'Test order',
  createdAt: '',
  updatedAt: '',
  number: 83755,
  ingredients: [
    'Краторная булка N-200i',
    'Филе Люминесцентного тетраодонтимформа'
  ]
};

const initialState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

describe('constructorSlice', () => {
  it('возвращает initialState по умолчанию', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('устанавливает булку', () => {
    const nextState = reducer(initialState, setBun(bun));
    expect(nextState.bun).toEqual(bun);
  });

  it('добавляет ингредиент', () => {
    const nextState = reducer(initialState, addIngredient(ingredient1));
    expect(nextState.ingredients).toHaveLength(1);
    expect(nextState.ingredients[0]).toEqual(ingredient1);
  });

  it('удаляет ингредиент по id', () => {
    const state = { ...initialState, ingredients: [ingredient1, ingredient2] };
    const nextState = reducer(state, removeIngredient('1'));
    expect(nextState.ingredients).toHaveLength(1);
    expect(nextState.ingredients[0]).toEqual(ingredient2);
  });

  it('меняет порядок ингредиентов', () => {
    const state = { ...initialState, ingredients: [ingredient1, ingredient2] };
    const nextState = reducer(state, moveIngredient({ from: 0, to: 1 }));
    expect(nextState.ingredients[0]).toEqual(ingredient2);
    expect(nextState.ingredients[1]).toEqual(ingredient1);
  });

  it('очищает конструктор', () => {
    const state = {
      bun,
      ingredients: [ingredient1],
      orderRequest: true,
      orderModalData: orderData
    };
    const nextState = reducer(state, clearConstructor());
    expect(nextState).toEqual(initialState);
  });

  it('устанавливает флаг orderRequest', () => {
    const nextState = reducer(initialState, setOrderRequest(true));
    expect(nextState.orderRequest).toBe(true);
  });

  it('устанавливает данные модального окна заказа', () => {
    const nextState = reducer(initialState, setOrderModalData(orderData));
    expect(nextState.orderModalData).toEqual(orderData);
  });
});
