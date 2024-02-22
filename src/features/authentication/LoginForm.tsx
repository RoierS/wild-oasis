import { useState } from 'react';

import { useLogin } from '@/hooks/useLogin';
import Button from '@/ui/Button/Button';
import Form from '@/ui/Form/Form';
import FormRowVertical from '@/ui/FormRowVertical/FormRowVertical';
import Input from '@/ui/Input/Input';
import SpinnerMini from '@/ui/SpinnerMini/SpinnerMini';

const LoginForm = () => {
  const [email, setEmail] = useState('test@gmail.com'); // Test user
  const [password, setPassword] = useState('Qwerty1!'); // Test user
  const { login, isLoggingIn } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button disabled={isLoggingIn} $size="large">
          {isLoggingIn ? <SpinnerMini /> : 'Login'}
        </Button>
      </FormRowVertical>
    </Form>
  );
};

export default LoginForm;
