import { calculaNovoSaldo } from './index';

describe('Deve retornar o valor do saldo atualizado após a operação', () => {
  test(' de transferência, o saldo deve diminuir', () => {
    const operacao = {
      transacao: 'Transferência',
      valor: 100,
    };
    const saldo = 1000;
    const novoSaldo = calculaNovoSaldo(operacao, saldo);

    expect(novoSaldo).toBe(900);
  });

  test(' de depósito, o saldo deve aumentar', () => {
    const operacao = {
      transacao: 'Depósito',
      valor: 100,
    };
    const saldo = 1000;
    const novoSaldo = calculaNovoSaldo(operacao, saldo);

    expect(novoSaldo).toBe(1100);
  });
});

test('Deve retornar o valor do saldo atualizado com o rendimento', () => {
  //dubla o comportanto por não existir a função ainda
  const calculaRendimento = jest.fn((saldo) => saldo + saldo * 0.005);

  const saldo = 100;

  const novoSaldo = calculaRendimento(saldo);

  expect(novoSaldo).toBe(100.5);
});

//exemplo com mockImplementation()

// test('Deve retornar o quadrado de um número', () => {
//   const calculaOQuadrado = jest.fn();
//   calculaOQuadrado.mockImplementation((num) => num ** 2);
//   expect(calculaOQuadrado(2)).toBe(4);
//   expect(calculaOQuadrado(4)).toBe(16);
// });
