import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
interface IRegisterResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: TUser;
}
interface ILoginResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: TUser;
}
interface IForgotPasswordResponse {
  success: boolean;
}

interface IResetPasswordResponse {
  success: boolean;
}
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      return;
    } catch (error) {
      return rejectWithValue('Ошибка при выходе');
    }
  }
);
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateUserApi(userData);
      if (response.success) {
        return response.user;
      } else {
        return rejectWithValue('Ошибка при обновлении данных пользователя');
      }
    } catch (error) {
      return rejectWithValue('Ошибка API');
    }
  }
);
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserApi();
      return data.user;
    } catch (error) {
      return rejectWithValue('Ошибка при получении данных пользователя');
    }
  }
);
export const resetPassword = createAsyncThunk<
  IResetPasswordResponse,
  { password: string; token: string }
>('auth/resetPassword', async (data, { rejectWithValue }) => {
  try {
    const response = await resetPasswordApi(data);
    if (response.success) {
      return response;
    } else {
      return rejectWithValue('Ошибка при сбросе пароля');
    }
  } catch (error) {
    return rejectWithValue('Ошибка API');
  }
});

export const registerUser = createAsyncThunk<
  IRegisterResponse,
  { email: string; name: string; password: string }
>('auth/registerUser', async (data, { rejectWithValue }) => {
  try {
    const response = await registerUserApi(data);
    if (response.success) {
      return response;
    } else {
      return rejectWithValue('Ошибка при регистрации');
    }
  } catch (error) {
    return rejectWithValue('Ошибка API');
  }
});

export const forgotPassword = createAsyncThunk<
  IForgotPasswordResponse,
  { email: string }
>('auth/forgotPassword', async (data, { rejectWithValue }) => {
  try {
    const response = await forgotPasswordApi(data);
    if (response.success) {
      return response;
    } else {
      return rejectWithValue('Ошибка при сбросе пароля');
    }
  } catch (error) {
    return rejectWithValue('Ошибка API');
  }
});

export const loginUser = createAsyncThunk<
  ILoginResponse,
  { email: string; password: string }
>('auth/loginUser', async (data, { rejectWithValue }) => {
  try {
    const response = await loginUserApi(data);
    if (response.success) {
      return response;
    } else {
      return rejectWithValue('Ошибка при входе');
    }
  } catch (error) {
    return rejectWithValue('Ошибка API');
  }
});
