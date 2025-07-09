import { BurgerConstructorElement, Modal } from '@components';
import { OrderDetailsUI, Preloader } from '@ui';
import { TConstructorIngredient, TOrder } from '@utils-types';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderBurger } from '../../../services/actions/orderActions';
import {
  clearConstructor,
  getBun,
  getIngredients
} from '../../../services/slices/constructorSlice';
import { RootState, useDispatch, useSelector } from '../../../services/store';
import { ROUTES } from '../../../utils/routes.enum';
import styles from './burger-constructor.module.css';
import { BurgerConstructorUIProps } from './type';

type TOrderData = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  constructorItems,
  orderRequest,
  price,
  orderModalData,
  onOrderClick,
  closeOrderModal
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bun = useSelector(getBun);
  const ingredients = useSelector(getIngredients);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const [isOrdering, setIsOrdering] = useState(false);
  const [orderData, setOrderData] = useState<TOrderData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    closeOrderModal();
    dispatch(clearConstructor());
  };

  const handleOrderClick = () => {
    if (!isAuth) {
      navigate(ROUTES.LOGIN);
      return;
    }

    if (!bun) return;

    const newOrderData: TOrderData = {
      _id: Date.now().toString(),
      status: 'new',
      name: 'Burger',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      number: Math.floor(Math.random() * 1000),
      ingredients: [
        bun._id,
        ...ingredients.map((item: TConstructorIngredient) => item._id)
      ]
    };

    setIsOrdering(true);

    dispatch(orderBurger(newOrderData.ingredients))
      .then((response) => {
        const order: TOrder = response.payload as TOrder;

        setOrderData({
          ...newOrderData,
          number: order.number
        });

        setIsModalOpen(true);
        setIsOrdering(false);
      })
      .catch((error) => {
        console.error('Error while placing the order:', error);
        setIsOrdering(false);
      });

    dispatch(clearConstructor());
  };

  return (
    <section className={styles.burger_constructor}>
      {/* Отображение булки сверху */}
      {constructorItems.bun ? (
        <div className={`${styles.element} mb-4 mr-4`}>
          <ConstructorElement
            type='top'
            isLocked
            text={`${constructorItems.bun.name} (верх)`}
            price={constructorItems.bun.price}
            thumbnail={constructorItems.bun.image}
          />
        </div>
      ) : (
        <div
          className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mb-4 mr-5 text text_type_main-default`}
        >
          Выберите булки
        </div>
      )}

      {/* Список ингредиентов */}
      <ul className={styles.elements}>
        {constructorItems.ingredients.length > 0 ? (
          constructorItems.ingredients.map(
            (item: TConstructorIngredient, index: number) => (
              <BurgerConstructorElement
                ingredient={item}
                index={index}
                totalItems={constructorItems.ingredients.length}
                key={item.id}
              />
            )
          )
        ) : (
          <div
            className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}
          >
            Выберите начинку
          </div>
        )}
      </ul>

      {/* Отображение булки снизу */}
      {constructorItems.bun ? (
        <div className={`${styles.element} mt-4 mr-4`}>
          <ConstructorElement
            type='bottom'
            isLocked
            text={`${constructorItems.bun.name} (низ)`}
            price={constructorItems.bun.price}
            thumbnail={constructorItems.bun.image}
          />
        </div>
      ) : (
        <div
          className={`${styles.noBuns} ${styles.noBunsBottom} ml-8 mb-4 mr-5 text text_type_main-default`}
        >
          Выберите булки
        </div>
      )}

      {/* Общая стоимость и кнопка оформления */}
      <div className={`${styles.total} mt-10 mr-4`}>
        <div className={`${styles.cost} mr-10`}>
          <p className={`${styles.text} mr-2`}>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button
          htmlType='button'
          type='primary'
          size='large'
          children={isOrdering ? 'Оформляем заказ...' : 'Оформить заказ'}
          onClick={handleOrderClick}
        />
      </div>

      {/* Прелоадер при оформлении заказа */}
      {isOrdering && (
        <Modal onClose={handleCloseModal} title='Оформляем заказ...'>
          <Preloader />
        </Modal>
      )}

      {/* Отображение данных заказа */}
      {orderData && isModalOpen && (
        <Modal onClose={handleCloseModal} title='Детали заказа'>
          <OrderDetailsUI orderNumber={orderData.number} />
        </Modal>
      )}
    </section>
  );
};
