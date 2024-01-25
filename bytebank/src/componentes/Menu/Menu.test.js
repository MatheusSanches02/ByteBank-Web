import { render, screen } from '@testing-library/react';
import Menu from './index';
import { BrowserRouter } from 'react-router-dom';

test('Deve renderizar um link para a página inicial', () => {
  render(<Menu />, { wrapper: BrowserRouter });
  const linkPaginaInicial = screen.getByText('Início');
  expect(linkPaginaInicial).toBeInTheDocument();
});

test('Deve renderizar uma lista de link', () => {
  render(<Menu />, { wrapper: BrowserRouter });
  const listaDeLink = screen.getAllByRole('link');
  expect(listaDeLink).toHaveLength(4);
});

test('Não deve renderizar o link para Extrato', () => {
  render(<Menu />, { wrapper: BrowserRouter });
  const linkExtrato = screen.queryByText('Extrato');
  expect(linkExtrato).not.toBeInTheDocument();
});

test('Deve renderizar uma lista de links com a classe link', () => {
  render(<Menu />, { wrapper: BrowserRouter });
  const links = screen.getAllByRole('link');
  links.forEach((link) => expect(link).toHaveClass('link'));
  expect(links).toMatchSnapshot();
});
