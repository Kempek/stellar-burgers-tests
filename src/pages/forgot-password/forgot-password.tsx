import { ForgotPasswordUI } from '@ui-pages';
import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { forgotPassword } from '../../services/actions/authActions';
import { useDispatch } from '../../services/store';
import { ROUTES } from '../../utils/routes.enum';

export const ForgotPassword: FC = () => {
  const [form, handleChange] = useForm({ email: '' });
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(forgotPassword({ email: form.email })).unwrap();

      localStorage.setItem('resetPassword', 'true');
      navigate(ROUTES.RESET_PASSWORD, { replace: true });
    } catch {
      setError('Invalid email');
    }
  };

  return (
    <ForgotPasswordUI
      email={form.email}
      errorText={error}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};
