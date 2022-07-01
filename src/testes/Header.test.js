import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';

describe('9 - Implemente elementos no header', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it('Verifica se os elementos estão presentes na tela principal', () => {
    renderPath('/foods');
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão de perfil é redirecionado a tela de perfil', () => {
    renderPath('/foods');
    const button = screen.getByTestId('profile-top-btn');
    userEvent.click(button);
    expect(window.location.pathname).toBe('/profile');
  });

  it('Verifica o botão de busca, ao ser clicado, aparece e desaparece', () => {
    renderPath('/drinks');
    const button = screen.getByTestId('search-top-btn');
    userEvent.click(button);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    userEvent.click(button);
    expect(screen.getByTestId('search-input')).not.toBeInTheDocument();
  });
});
