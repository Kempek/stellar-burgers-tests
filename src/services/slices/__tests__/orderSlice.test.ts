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

//Константы и моки
const ORDER: TOrder = {
  _id: 'o1',
  status: 'done',
  name: 'Test Order',
  createdAt: '',
  updatedAt: '',
  number: 1,
  ingredients: []
};

const ORDER_2: TOrder = { ...ORDER, _id: 'o2', number: 2 };

const FEEDS: TFeedsResponse = {
  success: true,
  orders: [ORDER, ORDER_2],
  total: 2,
  totalToday: 1
};

const INITIAL_STATE = {
  orders: [],
  loading: false,
  error: null,
  feeds: null,
  orderData: null
};

describe('orderSlice', () => {
  describe('sync reducers', () => {
    it('возвращает initialState по умолчанию', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(INITIAL_STATE);
    });

    it('setOrders устанавливает массив orders', () => {
      const nextState = reducer(INITIAL_STATE, setOrders([ORDER, ORDER_2]));
      expect(nextState.orders).toEqual([ORDER, ORDER_2]);
    });

    it('setFeeds устанавливает feeds', () => {
      const nextState = reducer(INITIAL_STATE, setFeeds(FEEDS));
      expect(nextState.feeds).toEqual(FEEDS);
    });

    it('setLoading меняет loading', () => {
      const nextState = reducer(INITIAL_STATE, setLoading(true));
      expect(nextState.loading).toBe(true);
    });

    it('setError меняет error', () => {
      const nextState = reducer(INITIAL_STATE, setError('Ошибка'));
      expect(nextState.error).toBe('Ошибка');
    });

    it('addOrder добавляет order', () => {
      const state = { ...INITIAL_STATE, orders: [ORDER] };
      const nextState = reducer(state, addOrder(ORDER_2));
      expect(nextState.orders).toEqual([ORDER, ORDER_2]);
    });

    it('setOrderData сохраняет orderData', () => {
      const nextState = reducer(INITIAL_STATE, setOrderData(ORDER));
      expect(nextState.orderData).toEqual(ORDER);
    });

    it('clearOrders очищает все заказы, orderData и ошибку', () => {
      const state = {
        orders: [ORDER],
        loading: false,
        error: 'Ошибка',
        feeds: FEEDS,
        orderData: ORDER_2
      };
      const nextState = reducer(state, clearOrders());
      expect(nextState.orders).toEqual([]);
      expect(nextState.orderData).toBeNull();
      expect(nextState.error).toBeNull();
    });
  });

  describe('async actions', () => {
    it('loading=true при fetchOrders.pending', () => {
      const action = { type: fetchOrders.pending.type };
      const nextState = reducer(INITIAL_STATE, action);
      expect(nextState.loading).toBe(true);
    });

    it('orders заполняются при fetchOrders.fulfilled', () => {
      const action = {
        type: fetchOrders.fulfilled.type,
        payload: [ORDER, ORDER_2]
      };
      const nextState = reducer({ ...INITIAL_STATE, loading: true }, action);
      expect(nextState.loading).toBe(false);
      expect(nextState.orders).toEqual([ORDER, ORDER_2]);
    });

    it('ошибка пишется при fetchOrders.rejected', () => {
      const action = {
        type: fetchOrders.rejected.type,
        payload: 'fail'
      };
      const prevState = { ...INITIAL_STATE, loading: true };
      const nextState = reducer(prevState, action);
      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe('fail');
    });

    it('feeds заполняются при fetchAllData.fulfilled', () => {
      const action = {
        type: fetchAllData.fulfilled.type,
        payload: FEEDS
      };
      const nextState = reducer({ ...INITIAL_STATE, loading: true }, action);
      expect(nextState.loading).toBe(false);
      expect(nextState.feeds).toEqual(FEEDS);
    });

    it('orderData заполняется при fetchOrderByNumber.fulfilled', () => {
      const action = {
        type: fetchOrderByNumber.fulfilled.type,
        payload: ORDER
      };
      const nextState = reducer({ ...INITIAL_STATE, loading: true }, action);
      expect(nextState.loading).toBe(false);
      expect(nextState.orderData).toEqual(ORDER);
    });
  });
});
