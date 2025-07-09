import { BurgerIngredientsUI } from '@ui';
import { TIngredient, TTabMode } from '@utils-types';
import { FC, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerIngredients: FC = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector((state) => state.ingredients);

  const buns = items.filter((item: TIngredient) => item.type === 'bun');
  const mains = items.filter((item: TIngredient) => item.type === 'main');
  const sauces = items.filter((item: TIngredient) => item.type === 'sauce');

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewMains] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewMains) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewMains, inViewSauces]);

  const onTabClick = (tab: TTabMode) => {
    setCurrentTab(tab);
    const refs = {
      bun: titleBunRef,
      main: titleMainRef,
      sauce: titleSaucesRef
    };
    refs[tab]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        Загрузка ингредиентов...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '40px', color: 'red' }}>
        Ошибка: {error}
      </div>
    );
  }

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={(val) => onTabClick(val as TTabMode)}
    />
  );
};
