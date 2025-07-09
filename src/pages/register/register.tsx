import { RegisterUI } from '@ui-pages';
import { FC, FormEvent, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { registerUser } from '../../services/actions/authActions';
import { setAuth, setTokens, setUser } from '../../services/slices/authSlice';
import { useDispatch, useSelector } from '../../services/store';
import { setCookie } from '../../utils/cookie';

export const Register: FC = () => {
  const [form, handleChange] = useForm({ name: '', email: '', password: '' });
  const [errorText, setErrorText] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await dispatch(registerUser(form)).unwrap();

      if (response?.success) {
        const { accessToken, refreshToken } = response;

        dispatch(
          setUser({ name: response.user.name, email: response.user.email })
        );
        dispatch(setAuth(true));
        dispatch(setTokens({ accessToken, refreshToken }));

        setCookie('accessToken', accessToken, { expires: 3600 });
        setCookie('refreshToken', refreshToken, { expires: 3600 });

        setErrorText('');
      }
    } catch {
      setErrorText('Ошибка при регистрации. Попробуйте снова.');
    }
  };

  return (
    <RegisterUI
      errorText={errorText}
      email={form.email}
      userName={form.name}
      password={form.password}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};
