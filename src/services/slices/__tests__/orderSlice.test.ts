import { TFeedsResponse, TOrder } from '@utils-types';
import {
  fetchAllData,
  fetchOrderByNumber,
  fetchOrders
} from '../../actions/orderActions';
import reducer, {
  addOrder,
  clearOrders,
  setError,
  setFeeds,
  setLoading,
  setOrderData,
  setOrders
} from '../orderSlice';

// Моки
const order: TOrder = {
  _id: 'o1',
  status: 'done',
  name: 'Test Order',
  createdAt: '',
  updatedAt: '',
  number: 1,
  ingredients: []
};
const order2: TOrder = { ...order, _id: 'o2', number: 2 };

const feeds: TFeedsResponse = {
  success: true,
  orders: [order, order2],
  total: 2,
  totalToday: 1
};

const initialState = {
  orders: [],
  loading: false,
  error: null,
  feeds: null,
  orderData: null
};

describe('orderSlice', () => {
  it('возвращает initialState по умолчанию', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('setOrders устанавливает массив orders', () => {
    const nextState = reducer(initialState, setOrders([order, order2]));
    expect(nextState.orders).toEqual([order, order2]);
  });

  it('setFeeds устанавливает feeds', () => {
    const nextState = reducer(initialState, setFeeds(feeds));
    expect(nextState.feeds).toEqual(feeds);
  });

  it('setLoading меняет loading', () => {
    const nextState = reducer(initialState, setLoading(true));
    expect(nextState.loading).toBe(true);
  });

  it('setError меняет error', () => {
    const nextState = reducer(initialState, setError('Ошибка'));
    expect(nextState.error).toBe('Ошибка');
  });

  it('addOrder добавляет order', () => {
    const state = { ...initialState, orders: [order] };
    const nextState = reducer(state, addOrder(order2));
    expect(nextState.orders).toEqual([order, order2]);
  });

  it('setOrderData сохраняет orderData', () => {
    const nextState = reducer(initialState, setOrderData(order));
    expect(nextState.orderData).toEqual(order);
  });

  it('clearOrders очищает все заказы, orderData и ошибку', () => {
    const state = {
      orders: [order],
      loading: false,
      error: 'Ошибка',
      feeds,
      orderData: order2
    };
    const nextState = reducer(state, clearOrders());
    expect(nextState.orders).toEqual([]);
    expect(nextState.orderData).toBeNull();
    expect(nextState.error).toBeNull();
  });

  it('loading true при fetchOrders.pending', () => {
    const action = { type: fetchOrders.pending.type };
    const nextState = reducer(initialState, action);
    expect(nextState.loading).toBe(true);
  });

  it('orders заполняются при fetchOrders.fulfilled', () => {
    const action = {
      type: fetchOrders.fulfilled.type,
      payload: [order, order2]
    };
    const nextState = reducer({ ...initialState, loading: true }, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.orders).toEqual([order, order2]);
  });

  it('ошибка пишется при fetchOrders.rejected', () => {
    const action = {
      type: fetchOrders.rejected.type,
      error: { message: 'fail' }
    };
    const prevState = { ...initialState, loading: true };
    const nextState = reducer(prevState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(undefined);
  });

  it('feeds заполняются при fetchAllData.fulfilled', () => {
    const action = {
      type: fetchAllData.fulfilled.type,
      payload: feeds
    };
    const nextState = reducer({ ...initialState, loading: true }, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.feeds).toEqual(feeds);
  });

  it('orderData заполняется при fetchOrderByNumber.fulfilled', () => {
    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: order
    };
    const nextState = reducer({ ...initialState, loading: true }, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.orderData).toEqual(order);
  });
});
