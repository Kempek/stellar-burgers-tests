import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFeedsResponse, TOrder } from '@utils-types';
import {
  fetchAllData,
  fetchFeeds,
  fetchOrderByNumber,
  fetchOrders,
  orderBurger
} from '../actions/orderActions';

interface IOrderState {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
  feeds: TFeedsResponse | null;
  orderData: TOrder | null;
}

const initialState: IOrderState = {
  orders: [],
  loading: false,
  error: null,
  feeds: null,
  orderData: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
    },
    setFeeds: (state, action: PayloadAction<TFeedsResponse>) => {
      state.feeds = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setOrderData: (state, action: PayloadAction<TOrder>) => {
      state.orderData = action.payload;
    },
    addOrder: (state, action: PayloadAction<TOrder>) => {
      state.orders.push(action.payload);
    },
    clearOrders: (state) => {
      state.orders = [];
      state.orderData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchAllData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.feeds = action.payload;
      })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(orderBurger.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const {
  setOrders,
  setFeeds,
  setLoading,
  setError,
  addOrder,
  setOrderData,
  clearOrders
} = orderSlice.actions;

export default orderSlice.reducer;
