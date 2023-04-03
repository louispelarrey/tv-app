import { FC, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button, Input, SpanError } from '@tv-app/ui';
import { UserContext } from '@tv-app/utility';
import { StyledRegister } from './Register.style';

interface RegisterFormInput {
  username: string;
  email: string;
  password: string;
}

export const Register : FC = () => {

  const { register, handleSubmit } = useForm<RegisterFormInput>();
  const { setAccessToken } = useContext(UserContext);
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit = async ({username, email, password}: RegisterFormInput) => {

    const response = await fetch(process.env.NX_SERVER_URL + "/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "username": username,
        "email": email,
        "password": password,
      }),
    });

    if (response.status !== 201) {
      setErrors(["Une erreur est survenue"]);
      return;
    }

    const data = await response.json();
    setAccessToken(data.access_token);
  };

  return (
    <StyledRegister>
      Inscription
      <Link to="/login">Déjà un compte ?</Link>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="Pseudo" register={register("username")} />
        <Input type="text" placeholder="Email" register={register("email")} />
        <Input type="password" placeholder="Mot de passe" register={register("password")} />
        <Button type="submit">S'inscrire</Button>
        <br />
        {errors && errors.map(error => (
          <SpanError key={error}>{error}</SpanError>
        ))}
      </form>
    </StyledRegister>
  );
}
