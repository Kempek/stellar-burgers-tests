import { ChangeEvent, FormEvent } from 'react';

export type ResetPasswordUIProps = {
  password: string;
  token: string;
  errorText: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
