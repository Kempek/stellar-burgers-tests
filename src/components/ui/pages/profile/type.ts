import { ChangeEvent, FormEvent } from 'react';

export type ProfileUIProps = {
  formValue: {
    name: string;
    email: string;
    password: string;
  };
  isFormChanged: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleCancel: (e: React.SyntheticEvent) => void;

  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  updateUserError?: string;
};
