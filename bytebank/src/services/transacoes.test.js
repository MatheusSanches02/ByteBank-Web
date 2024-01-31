import api from './api';
import { buscaTransacoes, salvaTransacao } from './transacoes';

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

//cria uma função para simular uma requisição GET, retornando os dados obtidos
const mockRequisicaoGET = (retorno) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: retorno });
    }, 200);
  });
};

//cria uma função para simular uma requisição POST, retornando o status 201(created), em caso de sucesso
const mockRequisicaoPOST = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 201,
      });
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

describe('Requisições para API de transações', () => {
  test('Deve buscar as transações', async () => {
    //mock da implementação do metodo GET
    api.get.mockImplementation(() => mockRequisicaoGET(mockTransacao));
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

  test('Deve realizar o POST de uma nova transação', async () => {
    api.post.mockImplementation(() => mockRequisicaoPOST());
    const status = await salvaTransacao(mockTransacao[0]);
    expect(status).toBe(201);
    expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao[0]);
  });
});
