import { render, screen } from '@testing-library/react';
import App from './paginas/Principal/App';
import AppRoutes from './routes';
import Cartoes from './componentes/Cartoes';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';

describe('Rotas', () => {
  test('Deve renderizar a página principal', () => {
    render(<App />, { wrapper: BrowserRouter });
    const usuario = screen.getByText('Olá, Joana :)!');
    expect(usuario).toBeInTheDocument();
  });
  test('Deve renderizar a página de cartões', () => {
    const rota = '/cartoes';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/cartoes" element={<Cartoes />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const cartoes = screen.getByText('Meus cartões');
    expect(cartoes).toHaveTextContent('Meus cartões');
  });
  test('Deve renderizar a página de investimentos', () => {
    const rota = '/investimentos';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <App />
      </MemoryRouter>
    );

    const investimentos = screen.getByText('Investimentos');

    expect(investimentos).toHaveTextContent('Investimentos');
  });
  test('Deve renderizar a localização da rota atual', () => {
    const rota = '/cartoes';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <App />
      </MemoryRouter>
    );

    const localizacao = screen.getByTestId('local');

    expect(localizacao).toHaveTextContent(rota);
  });
  test('Deve renderizar a página de not found', () => {
    const rota = '/extrato';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const paginaErro = screen.getByTestId('pagina-404');
    expect(paginaErro).toContainHTML('<h1>Ops! Não encontramos a página</h1>');
  });
});
