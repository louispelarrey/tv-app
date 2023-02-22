import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Menu } from './Menu';
import '@testing-library/jest-dom';

test('displays login and register links when user is not logged in', () => {
  // Arrange
  const mockContextValue = {
    accessToken: '',
    setAccessToken: jest.fn(),
  };
  render(
    <MemoryRouter>
      <UserContext.Provider value={mockContextValue}>
        <Menu />
      </UserContext.Provider>
    </MemoryRouter>
  );

  // Assert
  expect(screen.getByText(/connexion/i)).toBeInTheDocument();
  expect(screen.getByText(/s'inscrire/i)).toBeInTheDocument();
  expect(screen.queryByText(/séries/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/watchlist/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/déconnexion/i)).not.toBeInTheDocument();
});
