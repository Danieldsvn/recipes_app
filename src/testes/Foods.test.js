import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';
import meals from '../../cypress/mocks/meals';
import getFoodsAndDrinks from '../hooks/getFoodsAndDrinks';

describe('19 - Implemente os elementos na tela principal', () => {
  beforeEach(() => {
    renderPath('/foods');
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it('Verifica se os elementos estão presentes na tela principal', () => {
    const spy = jest.spyOn(getFoodsAndDrinks, 'default').mockImplementation(() => (
      Promise.resolve(meals)));
    expect(spy).toHaveBeenCalled();
    const limitFoods = 12;

    for (let index = 0; index < limitFoods; index += 1) {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }

    expect(screen.getByTestId('12-recipe-card')).not.toBeInTheDocument();
    expect(screen.getByTestId('12-card-img')).not.toBeInTheDocument();
    expect(screen.getByTestId('12-card-name')).not.toBeInTheDocument();
  });

  it(`Caso as receitas sejam de comida e a categoria seja "Breakfast",
    deve-se carregar as 12 primeiras receitas de "Breakfast"`, () => {
    const spy = jest.spyOn(global, 'fetch').mockImplementation(meals);
    expect(spy).toHaveBeenCalled();
    const filterButton = screen.getByTestId('Dessert-category-filter');
    userEvent.click(filterButton);
  });
});
