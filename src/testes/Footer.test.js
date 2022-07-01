import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';

describe('19 - Implemente elementos no footer', () => {
  beforeEach(() => {
    renderPath('/profile');
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it('Verifica se os elementos estão presentes na tela principal', () => {
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('explore-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('food-bottom-btn')).toBeInTheDocument();
  });

  it('Ao clicar no botão de bebidas é redirecionado a tela de bebidas', () => {
    const button = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(button);
    expect(window.location.pathname).toBe('/drinks');
  });

  it('Ao clicar no botão de comidas é redirecionado a tela de comidas', () => {
    const button = screen.getByTestId('food-bottom-btn');
    userEvent.click(button);
    expect(window.location.pathname).toBe('/foods');
  });

  it('Ao clicar no botão de explorar é redirecionado a tela de explorar', () => {
    const button = screen.getByTestId('explore-bottom-btn');
    userEvent.click(button);
    expect(window.location.pathname).toBe('/explore');
  });
});
