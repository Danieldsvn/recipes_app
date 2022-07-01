import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';

describe('1 - Crie uma tela de Login', () => {
  beforeEach(() => {
    renderPath('/');
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it('Tem os elementos presentes na tela', () => {
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
  });

  it('É possivel fazer o login e redirecionar para tela principal', () => {
    const myEmail = 'email@email.com';
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, myEmail);
    userEvent.type(passwordInput, 'teste123');
    userEvent.click(loginButton);

    const savedLogin = JSON.parse(localStorage.getItem('user'));
    expect(savedLogin.email).toBe(myEmail);

    expect(window.location.pathname).toBe('/foods');
  });
});
