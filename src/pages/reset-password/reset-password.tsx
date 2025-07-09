import { ResetPasswordUI } from '@ui-pages';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { resetPassword } from '../../services/actions/authActions';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { ROUTES } from '../../utils/routes.enum';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [form, handleChange] = useForm({ password: '', token: '' });
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const { loading, error: reduxError } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!form.token) {
      setError('Токен не найден в URL');
      return;
    }

    try {
      await dispatch(
        resetPassword({ password: form.password, token: form.token })
      ).unwrap();
      localStorage.removeItem('resetPassword');
      navigate(ROUTES.LOGIN);
    } catch (err: any) {
      setError(err?.message || 'Неверный код подтверждения');
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate(ROUTES.FORGOT_PASSWORD, { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      password={form.password}
      token={form.token}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      errorText={error || reduxError || ''}
    />
  );
};
