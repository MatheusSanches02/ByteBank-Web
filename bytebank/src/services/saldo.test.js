import api from './api';
import { render, screen } from '@testing-library/react';
import { buscaSaldo } from './saldo';

//cria um mock da API
jest.mock('./api');

//cria um mock de saldo
const mockSaldo = { valor: 100 };

//cria uma função para simular uma requisição GET, retornando os dados obtidos
const mockRequisicao = (retorno) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: retorno });
    }, 200);
  });
};

describe('Requisições para API de saldos', () => {
  test('Deve buscar o saldo', async () => {
    //mock da implementação do metodo GET
    api.get.mockImplementation(() => mockRequisicao(mockSaldo));
    const saldo = await buscaSaldo();
    expect(saldo).toEqual(mockSaldo.valor);
    expect(api.get).toHaveBeenCalledWith('/saldo');
  });
});
