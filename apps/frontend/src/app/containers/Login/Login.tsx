import { FC, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, SpanError } from '../../components';
import { UserContext } from '../../context/User/UserContext';
import { useForm } from "react-hook-form";
import { StyledLogin } from './Login.style';

export interface LoginFormInput {
  email: string;
  password: string;
}

export const Login : FC = () => {

  const { register, handleSubmit } = useForm<LoginFormInput>();

  const { setAccessToken } = useContext(UserContext);

  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit = async ({email, password} : LoginFormInput) => {
    const response = await fetch(process.env.NX_SERVER_URL + "/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "username": email,
        "password": password,
      }),
    });

    if (response.status !== 201) {
      setErrors(["Email ou mot de passe incorrect"]);
      return;
    }

    const data = await response.json();
    setAccessToken(data.access_token);
  };

  return (
    <StyledLogin>
      Se connecter
      <Link to="/register">Pas encore de compte ?</Link>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="Email/Pseudo" register={register("email")} />
        <Input type="password" placeholder="Mot de passe" register={register("password")} />
        <Button type="submit">Se connecter</Button>
        <br />
        {errors && errors.map(error => (
          <SpanError key={error}>{error}</SpanError>
        ))}
      </form>
    </StyledLogin>
  );
}
