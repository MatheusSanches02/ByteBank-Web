import api from './api';
import { buscaTransacoes } from './transacoes';
import { buscaSaldo } from './saldo';

//cria um mock da API
jest.mock('./api');

//cria um mock da transacao
const mockTransacao = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '29/01/2024',
    mes: 'Janeiro',
  },
];

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

//cria uma função para simular uma requisição GET, retornando uma lista vazia, em caso de falha da requisição
const mockRequisicaoErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

describe('Requisições para API', () => {
  test('Deve buscar as transações', async () => {
    //mock da implementação do metodo GET
    api.get.mockImplementation(() => mockRequisicao(mockTransacao));
    const transacoes = await buscaTransacoes();
    expect(transacoes).toEqual(mockTransacao);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });

  test('Deve retornar uma lista vazia, em caso de falha da requisição de transações', async () => {
    api.get.mockImplementation(() => mockRequisicaoErro());
    const transacoes = await buscaTransacoes();
    expect(transacoes).toEqual([]);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });

  test('Deve buscar o saldo', async () => {
    api.get.mockImplementation(() => mockRequisicao(mockSaldo));
    const saldo = await buscaSaldo();
    expect(saldo).toEqual(mockSaldo.valor);
    expect(api.get).toHaveBeenCalledWith('/saldo');
    expect(api.get).toHaveBeenCalledTimes(1);
  });
});
