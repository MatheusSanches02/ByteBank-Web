import { renderHook, act } from '@testing-library/react';
import { buscaTransacoes } from '../services/transacoes';
import useListaTransacoes from './useListaTransacoes';

jest.mock('../services/transacoes');

const mockTransacao = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '29/01/2024',
    mes: 'Janeiro',
  },
];

describe('hooks/useListaTransacoes.js', () => {
  test('deve retornar uma lista de transacoes e a função de atualização', async () => {
    buscaTransacoes.mockImplementation(() => mockTransacao);

    const { result } = renderHook(() => useListaTransacoes());
    //resultado esperado antes de chamar a função de atualização
    expect(result.current[0]).toEqual([]);

    //chamada da função assíncrona de atualização, para atualizar o estado do hook
    await act(async () => {
      result.current[1]();
    });

    //resultado esperado após chamar a função de atualização
    expect(result.current[0]).toEqual(mockTransacao);
  });
});
