import rootReducer from './rootReducer';

describe('rootReducer', () => {
  it('возвращает начальное состояние при неизвестном экшене', () => {
    // вызываем rootReducer без стейта и с несуществующим экшеном
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    // Проверяем, что все нужные ключи есть
    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('constructor');
    expect(initialState).toHaveProperty('order');
    expect(initialState).toHaveProperty('auth');
  });
});
