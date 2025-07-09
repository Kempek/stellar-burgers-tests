export type RegisterUIProps = {
  email: string;
  userName: string;
  password: string;
  errorText: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
