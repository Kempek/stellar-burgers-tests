import {
  Button,
  Input,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../utils/routes.enum';
import styles from '../common.module.css';
import { RegisterUIProps } from './type';

export const RegisterUI: FC<RegisterUIProps> = ({
  errorText,
  email,
  userName,
  password,
  handleSubmit,
  handleChange
}) => (
  <main className={styles.container}>
    <div className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className='pb-6 text text_type_main-medium'>Регистрация</h3>
      <form
        className={`pb-15 ${styles.form}`}
        name='register'
        onSubmit={handleSubmit}
      >
        <div className='pb-6'>
          <Input
            type='text'
            placeholder='Имя'
            name='name'
            value={userName}
            onChange={handleChange}
            autoComplete='given-name'
            error={false}
            errorText=''
            size='default'
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          />
        </div>
        <div className='pb-6'>
          <Input
            type='email'
            placeholder='E-mail'
            name='email'
            value={email}
            onChange={handleChange}
            autoComplete='email'
            error={false}
            errorText=''
            size='default'
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          />
        </div>
        <div className='pb-6'>
          <PasswordInput
            name='password'
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className={`pb-6 ${styles.button}`}>
          <Button type='primary' size='medium' htmlType='submit'>
            Зарегистрироваться
          </Button>
        </div>
        {errorText && (
          <p className={`${styles.error} text text_type_main-default pb-6`}>
            {errorText}
          </p>
        )}
      </form>
      <div className={`${styles.question} text text_type_main-default pb-6`}>
        Уже зарегистрированы?
        <Link to={ROUTES.LOGIN} className={`pl-2 ${styles.link}`}>
          Войти
        </Link>
      </div>
    </div>
  </main>
);
