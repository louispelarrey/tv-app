import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../../../context/User/UserContext';
import { Logout } from '../Logout';

describe('Logout component', () => {
  test('renders "Deconnexion en cours" text', () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ setAccessToken: jest.fn() }}>
          <Logout />
        </UserContext.Provider>
      </BrowserRouter>
    );
    const textElement = screen.getByText(/Deconnexion en cours/i);
    expect(textElement).toBeInTheDocument();
  });

  test('clears access token and removes it from local storage', () => {
    const setAccessToken = jest.fn();
    Object.defineProperty(window, 'localStorage', {
      value: {
        removeItem: jest.fn(),
      },
      writable: true,
    });

    render(
      <BrowserRouter>
        <UserContext.Provider value={{ setAccessToken: jest.fn() }}>
          <Logout />
        </UserContext.Provider>
      </BrowserRouter>
    );

    expect(localStorage.removeItem).toHaveBeenCalledWith('accessToken');
  });
});
