import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookie';
import {
  fetchUser,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser
} from '../actions/authActions';

interface AuthState {
  isAuth: boolean;
  user: null | { name: string; email: string };
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  resetPasswordSuccess: boolean;
  authChecked: boolean;
}

const initialState: AuthState = {
  isAuth: false,
  user: null,
  accessToken: getCookie('accessToken') || null,
  refreshToken: null,
  loading: false,
  error: null,
  resetPasswordSuccess: false,
  authChecked: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (
      state,
      action: PayloadAction<{ name: string; email: string } | null>
    ) => {
      state.user = action.payload;
    },
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearAuth: (state) => {
      state.isAuth = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      state.resetPasswordSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = {
          name: action.payload.user.name,
          email: action.payload.user.email
        };
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = {
          name: action.payload.user.name,
          email: action.payload.user.email
        };
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetPasswordSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.resetPasswordSuccess = false;
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetPasswordSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.resetPasswordSuccess = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { name: action.payload.name, email: action.payload.email };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuth = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = {
          name: action.payload.name,
          email: action.payload.email
        };
        state.authChecked = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.isAuth = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.authChecked = true;
      });
  }
});

export const { setAuth, setUser, setTokens, clearAuth } = authSlice.actions;

export default authSlice.reducer;
