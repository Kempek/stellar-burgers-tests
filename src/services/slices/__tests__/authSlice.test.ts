import { forgotPassword, registerUser } from '../../actions/authActions';
import authReducer, {
  clearAuth,
  setAuth,
  setTokens,
  setUser
} from '../authSlice';

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
    const user = { name: 'Test', email: 'test@mail.com' };
    const nextState = authReducer(initialState, setUser(user));
    expect(nextState.user).toEqual(user);
  });

  it('обрабатывает setTokens', () => {
    const nextState = authReducer(
      initialState,
      setTokens({ accessToken: 'abc', refreshToken: 'def' })
    );
    expect(nextState.accessToken).toBe('abc');
    expect(nextState.refreshToken).toBe('def');
  });

  it('обрабатывает clearAuth', () => {
    const stateWithData = {
      ...initialState,
      isAuth: true,
      user: { name: 'Test', email: 'test@mail.com' },
      accessToken: 'abc',
      refreshToken: 'def',
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
      // pending
      email: 'test@mail.com',
      name: 'Test',
      password: '123456'
    });
    const nextState = authReducer(initialState, action);
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it('обрабатывает registerUser.fulfilled', () => {
    // fulfilled
    const payload = {
      success: true,
      user: { name: 'Test', email: 'test@mail.com' },
      accessToken: 'abc',
      refreshToken: 'def'
    };
    const action = registerUser.fulfilled(payload, 'requestId', {
      email: 'test@mail.com',
      name: 'Test',
      password: '123456'
    });
    const nextState = authReducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.isAuth).toBe(true);
    expect(nextState.user).toEqual(payload.user);
    expect(nextState.accessToken).toBe('abc');
    expect(nextState.refreshToken).toBe('def');
  });

  it('обрабатывает registerUser.rejected', () => {
    // rejected
    const action = registerUser.rejected(
      new Error('Ошибка регистрации'),
      'requestId',
      { email: 'test@mail.com', name: 'Test', password: '123456' }
    );
    const nextState = authReducer(initialState, action);
    expect(nextState.loading).toBe(false);
  });

  it('обрабатывает forgotPassword.fulfilled', () => {
    const forgotPayload = {
      success: true,
      message: 'Reset email sent'
    };
    const action = forgotPassword.fulfilled(forgotPayload, 'requestId', {
      email: 'test@mail.com'
    });
    const nextState = authReducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.resetPasswordSuccess).toBe(true);
  });
});
