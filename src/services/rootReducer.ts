import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import constructorReducer from './slices/constructorSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import orderReducer from './slices/orderSlice';
const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  order: orderReducer,
  auth: authReducer
});

export default rootReducer;
