import { Estoque } from './../../estoque/estoque.entity';

export default class TestUtil {
  static giveMeAValidEstoque(): Estoque {
    const estoque = new Estoque();
    estoque.id = 1;
    estoque.nome = 'Produto 1';
    estoque.quantidade = 100;
    estoque.valorUnitario = 15.5;
    estoque.excluido = false;
    return estoque;
  }
}
