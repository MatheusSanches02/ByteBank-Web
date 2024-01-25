import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from "../../routes";

describe('Componente <App/>', () => {
    test('Deve permitir adicionar uma transação em Extrato', () => {
        render(<App/>, { wrapper: BrowserRouter })

        const select = screen.getByRole('combobox')
        const campoValor = screen.getByPlaceholderText('Digite um valor')
        const botao = screen.getByRole('button')

        userEvent.selectOptions(select, ['Depósito'])
        userEvent.type(campoValor, '100')
        userEvent.click(botao)

        const transacao = screen.getByTestId('lista-transacoes')
        const itemExtrato = screen.getByRole('listitem')

        expect(transacao).toContainElement(itemExtrato)
    })
    test('Deve navegar até a página correspondente ao link clicado', () => {
        render(<AppRoutes/>, { wrapper: BrowserRouter })
        const linkPaginaCartoes = screen.getByText('Cartões')

        expect(linkPaginaCartoes).toBeInTheDocument()
    })
})