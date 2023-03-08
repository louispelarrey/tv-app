import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../../../context/User/UserContext';
import { Login } from '../Login';

describe('Login component', () => {
  test('renders Login component', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByText(/Connexion à l'application/i)).toBeInTheDocument();
  });

  test('displays error message if login fails', async () => {
    const setAccessToken = jest.fn();
    const mockResponse = { status: 401 };

    global.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse));
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ setAccessToken }}>
          <Login />
        </UserContext.Provider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email\/Pseudo/i), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Mot de passe/i), {
      target: { value: 'testpassword' },
    });

    fireEvent.click(screen.getByText(/Se connecter/i));
    const errorMessage = await screen.findByText(/Email ou mot de passe incorrect/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
