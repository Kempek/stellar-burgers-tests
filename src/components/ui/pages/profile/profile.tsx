import { FC } from 'react';
import commonStyles from '../common.module.css';
import styles from './profile.module.css';

import { ProfileMenu } from '@components';
import { Button, Input } from '@zlden/react-developer-burger-ui-components';
import { ProfileUIProps } from './type';

export const ProfileUI: FC<ProfileUIProps> = ({
  formValue,
  isFormChanged,
  updateUserError,
  handleSubmit,
  handleCancel,
  handleInputChange
}) => (
  <main className={commonStyles.container}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>
    <form
      className={`mt-30 ${styles.form} ${commonStyles.form}`}
      onSubmit={handleSubmit}
    >
      <div className='pb-6'>
        <Input
          type='text'
          placeholder='Имя'
          name='name'
          value={formValue.name}
          onChange={handleInputChange}
          autoComplete='name'
          error={false}
          errorText=''
          size='default'
          icon='EditIcon'
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />
      </div>
      <div className='pb-6'>
        <Input
          type='email'
          placeholder='E-mail'
          name='email'
          value={formValue.email}
          onChange={handleInputChange}
          autoComplete='email'
          error={false}
          errorText=''
          size='default'
          icon='EditIcon'
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />
      </div>
      <div className='pb-6'>
        <Input
          type='password'
          placeholder='Пароль'
          name='password'
          value={formValue.password}
          onChange={handleInputChange}
          autoComplete='new-password'
          error={false}
          errorText=''
          size='default'
          icon='EditIcon'
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />
      </div>

      {isFormChanged && (
        <div className={styles.button}>
          <Button
            type='secondary'
            htmlType='button'
            size='medium'
            onClick={handleCancel}
          >
            Отменить
          </Button>
          <Button type='primary' size='medium' htmlType='submit'>
            Сохранить
          </Button>
        </div>
      )}

      {updateUserError && (
        <p className={`${commonStyles.error} pt-5 text text_type_main-default`}>
          {updateUserError}
        </p>
      )}
    </form>
  </main>
);
