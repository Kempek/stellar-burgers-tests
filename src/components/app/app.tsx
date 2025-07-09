import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import '../../index.css';
import { fetchUser } from '../../services/actions/authActions';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { RootState, useDispatch } from '../../services/store';
import { ROUTES } from '../../utils/routes.enum';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import styles from './app.module.css';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const items = useSelector((state: RootState) => state.ingredients.items);
  const [hasFetched, setHasFetched] = useState(false);

  const location = useLocation();
  const state = location.state as { background?: Location };
  const background = state?.background;

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (!hasFetched && items.length === 0) {
      dispatch(fetchIngredients());
      setHasFetched(true);
    }
  }, [hasFetched, items.length, dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      {/* Основной роутинг, включая отдельный переход по модальному адресу */}
      <Routes location={background || location}>
        <Route path={ROUTES.HOME} element={<ConstructorPage />} />
        <Route path={ROUTES.FEED} element={<Feed />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound404 />} />

        {/* Страницы, доступные только авторизованным пользователям */}
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute isAuth={isAuth} redirectTo={ROUTES.LOGIN}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROFILE_ORDERS}
          element={
            <ProtectedRoute isAuth={isAuth} redirectTo={ROUTES.LOGIN}>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROFILE_ORDERS_NUMBER}
          element={
            <ProtectedRoute isAuth={isAuth} redirectTo={ROUTES.LOGIN}>
              <OrderInfo />
            </ProtectedRoute>
          }
        />

        {/* Страницы, доступные только неавторизованным пользователям */}
        <Route
          path={ROUTES.LOGIN}
          element={
            <ProtectedRoute isAuth={!isAuth} redirectTo={ROUTES.HOME}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.REGISTER}
          element={
            <ProtectedRoute isAuth={!isAuth} redirectTo={ROUTES.HOME}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.FORGOT_PASSWORD}
          element={
            <ProtectedRoute isAuth={!isAuth} redirectTo={ROUTES.HOME}>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.RESET_PASSWORD}
          element={
            <ProtectedRoute isAuth={!isAuth} redirectTo={ROUTES.LOGIN}>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        {/* Прямой доступ к деталям ингредиента или заказа */}
        <Route path={ROUTES.INGREDIENTS} element={<IngredientDetails />} />
        <Route path={ROUTES.FEED + '/:number'} element={<OrderInfo />} />
      </Routes>

      {/* Модальные окна поверх текущей страницы */}
      {background && (
        <Routes>
          <Route
            path={ROUTES.INGREDIENTS}
            element={
              <Modal title='Ингредиенты' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={ROUTES.FEED + '/:number'}
            element={
              <Modal title='Детали заказа' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path={ROUTES.PROFILE_ORDERS_NUMBER}
            element={
              <ProtectedRoute isAuth={isAuth} redirectTo={ROUTES.HOME}>
                <Modal title='Детали заказа' onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
