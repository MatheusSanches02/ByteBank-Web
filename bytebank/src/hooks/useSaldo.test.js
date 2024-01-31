import { renderHook, act } from '@testing-library/react';
import { buscaSaldo } from '../services/saldo';
import useSaldo from './useSaldo';

//simula a chamada do serviço de saldo
jest.mock('../services/saldo');

const mockSaldo = { valor: 100 };

describe('hooks/useSaldo.js', () => {
  test('Deve retornar um saldo e uma função de atualização do saldo', async () => {
    buscaSaldo.mockImplementation(() => mockSaldo.valor);
    const { result } = renderHook(() => useSaldo());

    expect(result.current[0]).toEqual(0);

    await act(async () => {
      result.current[1]();
    });

    expect(result.current[0]).toEqual(mockSaldo.valor);
  });
});
