import {
  Button,
  Input,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../utils/routes.enum';
import styles from '../common.module.css';
import { ResetPasswordUIProps } from './type';

export const ResetPasswordUI: FC<ResetPasswordUIProps> = ({
  errorText,
  password,
  token,
  handleChange,
  handleSubmit
}) => (
  <main className={styles.container}>
    <div className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className='pb-6 text text_type_main-medium'>Восстановление пароля</h3>
      <form
        className={`pb-15 ${styles.form}`}
        name='reset'
        onSubmit={handleSubmit}
      >
        <div className='pb-6'>
          <PasswordInput
            onChange={handleChange}
            value={password}
            name='password'
          />
        </div>
        <div className='pb-6'>
          <Input
            type='text'
            placeholder='Введите код из письма'
            onChange={handleChange}
            value={token}
            name='token'
            error={false}
            errorText=''
            size='default'
            autoComplete='one-time-code'
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          />
        </div>
        <div className={`pb-6 ${styles.button}`}>
          <Button type='primary' size='medium' htmlType='submit'>
            Сохранить
          </Button>
        </div>
        {errorText && (
          <p className={`${styles.error} text text_type_main-default pb-6`}>
            {errorText}
          </p>
        )}
      </form>
      <div className={`${styles.question} text text_type_main-default pb-6`}>
        Вспомнили пароль?
        <Link to={ROUTES.LOGIN} className={`pl-2 ${styles.link}`}>
          Войти
        </Link>
      </div>
    </div>
  </main>
);
