import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import { Estoque } from './estoque.entity';
import { CriarEstoqueDto } from './dtos/criar-estoque.dto';
import { AtualizarEstoqueDto } from './dtos/atualizar-estoque.dto';
import { BuscarEstoqueDto } from './dtos/buscar-estoque.dto';
@Injectable()
export class EstoqueService {
  constructor(
    @InjectRepository(Estoque)
    private estoqueRepository: Repository<Estoque>,
  ) {}

  async criar(criarEstoque: CriarEstoqueDto): Promise<Estoque> {
    const estoque = this.estoqueRepository.create({ ...criarEstoque });
    return this.estoqueRepository.save(estoque);
  }

  async update(
    id: number,
    atualizarEstoque: AtualizarEstoqueDto,
  ): Promise<Estoque> {
    const estoque = await this.findById(id);
    const estoqueToSave = this.estoqueRepository.create({
      ...estoque,
      ...atualizarEstoque,
    });
    return this.estoqueRepository.save(estoqueToSave);
  }

  async buscar(buscarEstoqueDto: BuscarEstoqueDto): Promise<Estoque[]> {
    const query = { excluido: false };
    if (buscarEstoqueDto.nome) {
      query['nome'] = ILike(buscarEstoqueDto.nome);
    }
    if (buscarEstoqueDto.quantidadeDe && buscarEstoqueDto.quantidadeAte) {
      query['quantidade'] = Between(
        buscarEstoqueDto.quantidadeDe,
        buscarEstoqueDto.quantidadeAte,
      );
    }
    if (buscarEstoqueDto.valorDe || buscarEstoqueDto.valorAte) {
      query['valvalorUnitario'] = Between(
        buscarEstoqueDto.valorDe,
        buscarEstoqueDto.valorAte,
      );
    }
    return this.estoqueRepository.find(query);
  }

  async deletar(id: number): Promise<boolean> {
    const estoque = await this.findById(id);
    estoque.excluido = true;
    this.estoqueRepository.save(estoque);
    return true;
  }

  async findById(id: number): Promise<Estoque> {
    const estoque = this.estoqueRepository.findOne(id);
    if (!estoque) {
      throw new BadRequestException(
        'Não foi encontrado nenhum estoque para atualizar',
      );
    }
    return estoque;
  }
}
