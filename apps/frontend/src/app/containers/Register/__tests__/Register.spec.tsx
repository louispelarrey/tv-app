import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Register } from '../Register';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../../../context/User/UserContext';

describe('Register component', () => {
  test('renders the registration form', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    expect(screen.getByText('Inscription')).toBeInTheDocument();
    expect(screen.getByText('Déjà un compte ?')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Pseudo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mot de passe')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('calls the onSubmit function when the form is submitted', async () => {
    const setAccessToken = jest.fn();
    const mockResponse = { access_token: 'mock-token' };
    global.fetch = jest.fn(() => Promise.resolve({
      status: 201,
      json: () => Promise.resolve(mockResponse)
    }));

    render(
      <BrowserRouter>
        <UserContext.Provider value={{ setAccessToken }}>
          <Register />
        </UserContext.Provider>
      </BrowserRouter>
    );
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/user'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: '', email: '', password: '' })
        })
      );
    });
  });

  test('displays an error message if the server returns an error', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      status: 400,
      json: () => Promise.resolve({ error: 'Bad Request' })
    }));

    render(
      <BrowserRouter><Register /></BrowserRouter>

    );
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Une erreur est survenue')).toBeInTheDocument();
    });
  });
});
