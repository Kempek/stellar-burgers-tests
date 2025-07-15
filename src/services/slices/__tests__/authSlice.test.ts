import { forgotPassword, registerUser } from '../../actions/authActions';
import authReducer, {
  clearAuth,
  setAuth,
  setTokens,
  setUser
} from '../authSlice';

// Моки и константы
const TEST_EMAIL = 'test@mail.com';
const TEST_USER = { name: 'Test', email: TEST_EMAIL };
const ACCESS_TOKEN = 'abc';
const REFRESH_TOKEN = 'def';
const ERROR_MSG = 'Ошибка регистрации';
const REGISTER_PAYLOAD = {
  success: true,
  user: TEST_USER,
  accessToken: ACCESS_TOKEN,
  refreshToken: REFRESH_TOKEN
};
const FORGOT_PAYLOAD = {
  success: true,
  message: 'Reset email sent'
};
const initialState = {
  isAuth: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  resetPasswordSuccess: false,
  authChecked: false
};

describe('authSlice', () => {
  it('возвращает initialState по умолчанию', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('обрабатывает setAuth', () => {
    const nextState = authReducer(initialState, setAuth(true));
    expect(nextState.isAuth).toBe(true);
  });

  it('обрабатывает setUser', () => {
    const nextState = authReducer(initialState, setUser(TEST_USER));
    expect(nextState.user).toEqual(TEST_USER);
  });

  it('обрабатывает setTokens', () => {
    const nextState = authReducer(
      initialState,
      setTokens({ accessToken: ACCESS_TOKEN, refreshToken: REFRESH_TOKEN })
    );
    expect(nextState.accessToken).toBe(ACCESS_TOKEN);
    expect(nextState.refreshToken).toBe(REFRESH_TOKEN);
  });

  it('обрабатывает clearAuth', () => {
    const stateWithData = {
      ...initialState,
      isAuth: true,
      user: TEST_USER,
      accessToken: ACCESS_TOKEN,
      refreshToken: REFRESH_TOKEN,
      error: 'error',
      resetPasswordSuccess: true
    };
    const nextState = authReducer(stateWithData, clearAuth());
    expect(nextState.isAuth).toBe(false);
    expect(nextState.user).toBe(null);
    expect(nextState.accessToken).toBe(null);
    expect(nextState.refreshToken).toBe(null);
    expect(nextState.error).toBe(null);
    expect(nextState.resetPasswordSuccess).toBe(false);
  });

  it('обрабатывает registerUser.pending', () => {
    const action = registerUser.pending('requestId', {
      email: TEST_EMAIL,
      name: TEST_USER.name,
      password: '123456'
    });
    const nextState = authReducer(initialState, action);
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it('обрабатывает registerUser.fulfilled', () => {
    const action = registerUser.fulfilled(REGISTER_PAYLOAD, 'requestId', {
      email: TEST_EMAIL,
      name: TEST_USER.name,
      password: '123456'
    });
    const nextState = authReducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.isAuth).toBe(true);
    expect(nextState.user).toEqual(REGISTER_PAYLOAD.user);
    expect(nextState.accessToken).toBe(ACCESS_TOKEN);
    expect(nextState.refreshToken).toBe(REFRESH_TOKEN);
  });

  it('обрабатывает registerUser.rejected', () => {
    const action = registerUser.rejected(new Error(ERROR_MSG), 'requestId', {
      email: TEST_EMAIL,
      name: TEST_USER.name,
      password: '123456'
    });
    const nextState = authReducer(initialState, action);
    expect(nextState.loading).toBe(false);
  });

  it('обрабатывает forgotPassword.fulfilled', () => {
    const action = forgotPassword.fulfilled(FORGOT_PAYLOAD, 'requestId', {
      email: TEST_EMAIL
    });
    const nextState = authReducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.resetPasswordSuccess).toBe(true);
  });
});
