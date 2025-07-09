import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TFeedsResponse, TOrder } from '@utils-types';
import { setFeeds } from '../slices/orderSlice';
export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
  'order/fetchOrderByNumber',
  async (orderNumber: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(orderNumber);
      if (response && response.orders) {
        return response.orders[0];
      } else {
        return rejectWithValue('Ошибка при получении данных заказа');
      }
    } catch (error) {
      return rejectWithValue('Ошибка API');
    }
  }
);

export const orderBurger = createAsyncThunk<TOrder, string[]>(
  'order/orderBurger',
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredients);
      if (response.success) {
        return response.order;
      } else {
        return rejectWithValue('Ошибка при оформлении заказа');
      }
    } catch (error) {
      return rejectWithValue('Ошибка API');
    }
  }
);

export const fetchOrders = createAsyncThunk<TOrder[], void>(
  'order/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      if (response.length > 0) {
        return response;
      } else {
        throw new Error('Ошибка при получении данных о заказах');
      }
    } catch (error) {
      throw new Error('Ошибка API: ');
    }
  }
);

export const fetchFeeds = createAsyncThunk<TOrder[], void>(
  'order/fetchFeeds',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      if (response?.orders) {
        return response.orders;
      } else {
        return rejectWithValue('Ошибка при получении данных о заказах');
      }
    } catch (error) {
      return rejectWithValue('Ошибка API: ');
    }
  }
);

export const fetchAllData = createAsyncThunk<TFeedsResponse, void>(
  'order/fetchAllData',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await getFeedsApi();
      if (response?.orders) {
        dispatch(setFeeds(response));
        return response;
      } else {
        return rejectWithValue('Ошибка при получении данных о заказах');
      }
    } catch (error) {
      return rejectWithValue('Ошибка API: ');
    }
  }
);
