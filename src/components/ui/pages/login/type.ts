import { ChangeEvent } from 'react';

export interface LoginUIProps {
  email: string;
  password: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errorText: string;
}
