import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Menu } from '../Menu';
import '@testing-library/jest-dom';
import { UserContext } from '../../../context/User/UserContext';

test('displays login and register links when user is not logged in', () => {
  // Arrange
  const mockContextValue = {
    accessToken: '',
    setAccessToken: jest.fn(),
  };
  render(
    <BrowserRouter>
      <UserContext.Provider value={mockContextValue}>
        <Menu />
      </UserContext.Provider>
    </BrowserRouter>
  );

  // Assert
  expect(screen.getByText(/connexion/i)).toBeInTheDocument();
  expect(screen.getByText(/s'inscrire/i)).toBeInTheDocument();
  expect(screen.queryByText(/séries/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/watchlist/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/déconnexion/i)).not.toBeInTheDocument();
});
