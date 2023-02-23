import { ChangeEvent, FC, SyntheticEvent, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Input, SpanError } from '../components';
import { UserContext } from '../context/UserContext';

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
export const Login : FC = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setAccessToken } = useContext(UserContext);

  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

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

  const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <StyledLogin>
      Se connecter
      <Link to="/register">Pas encore de compte ?</Link>

      <form onSubmit={handleSubmit}>
        <Input type="text" placeholder="Email/Pseudo" name="email" onChange={onUsernameChange} />
        <Input type="password" placeholder="Mot de passe" name="password" onChange={onPasswordChange} />
        <Button type="submit">Se connecter</Button>
        <br />
        {errors && errors.map(error => (
          <SpanError key={error}>{error}</SpanError>
        ))}
      </form>
    </StyledLogin>
  );
}
