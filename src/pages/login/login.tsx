import { LoginUI } from '@ui-pages';
import { FC, FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { loginUser } from '../../services/actions/authActions';
import { setAuth, setTokens, setUser } from '../../services/slices/authSlice';
import { useDispatch } from '../../services/store';
import { setCookie } from '../../utils/cookie';
import { ROUTES } from '../../utils/routes.enum';

export const Login: FC = () => {
  const [form, handleChange] = useForm({ email: '', password: '' });
  const [errorText, setErrorText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || ROUTES.HOME;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await dispatch(loginUser(form)).unwrap();

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
        navigate(from, { replace: true });
      }
    } catch {
      setErrorText('Ошибка при входе. Проверьте данные и попробуйте снова.');
    }
  };

  return (
    <LoginUI
      email={form.email}
      password={form.password}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      errorText={errorText}
    />
  );
};
