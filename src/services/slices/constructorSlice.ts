import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

interface IConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: IConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<TIngredient>) => ({
      ...state,
      bun: { ...action.payload }
    }),
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => ({
      ...state,
      ingredients: [...(state.ingredients || []), action.payload]
    }),
    removeIngredient: (state, action: PayloadAction<string>) => ({
      ...state,
      ingredients: (state.ingredients || []).filter(
        (item) => item.id !== action.payload
      )
    }),
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const ingredients = [...(state.ingredients || [])];
      const { from, to } = action.payload;
      const [removed] = ingredients.splice(from, 1);
      ingredients.splice(to, 0, removed);
      return {
        ...state,
        ingredients
      };
    },
    clearConstructor: () => ({
      ...initialState
    }),
    setOrderRequest: (state, action: PayloadAction<boolean>) => ({
      ...state,
      orderRequest: action.payload
    }),
    setOrderModalData: (state, action: PayloadAction<TOrder | null>) => ({
      ...state,
      orderModalData: action.payload
    })
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  setOrderRequest,
  setOrderModalData
} = constructorSlice.actions;

export default constructorSlice.reducer;
export const getBun = (state: { constructor: IConstructorState }) =>
  state.constructor.bun;

export const getIngredients = (state: { constructor: IConstructorState }) =>
  state.constructor.ingredients;

export const getOrderRequest = (state: { constructor: IConstructorState }) =>
  state.constructor.orderRequest;

export const getOrderModalData = (state: { constructor: IConstructorState }) =>
  state.constructor.orderModalData;
