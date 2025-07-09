import { ProfileUI } from '@ui-pages';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { fetchUser, updateUser } from '../../services/actions/authActions';
import { RootState, useDispatch, useSelector } from '../../services/store';

export const Profile: FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formValue, handleChange, setFormValue] = useForm({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user, setFormValue]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormChanged) {
      try {
        await dispatch(updateUser(formValue)).unwrap();
        setError(null);
      } catch (error) {
        setError('Ошибка при обновлении данных пользователя');
      }
    }
  };

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={error || ''}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleChange}
    />
  );
};
