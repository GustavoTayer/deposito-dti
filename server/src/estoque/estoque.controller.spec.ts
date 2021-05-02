import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../common/test/TestUtil';
import { Repository } from 'typeorm';
import { EstoqueController } from './estoque.controller';
import { Estoque } from './estoque.entity';
import { EstoqueService } from './estoque.service';
import { BadRequestException } from '@nestjs/common';

describe('EstoqueController', () => {
  let controller: EstoqueController;
  let service: EstoqueService;
  let repo: Repository<Estoque>;
  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstoqueController],
      providers: [
        EstoqueService,
        {
          provide: getRepositoryToken(Estoque),
          useValue: mockRepository,
        },
      ],
    }).compile();
    service = module.get<EstoqueService>(EstoqueService);
    repo = module.get<Repository<Estoque>>(getRepositoryToken(Estoque));
    controller = module.get<EstoqueController>(EstoqueController);
  });

  beforeEach(() => {
    mockRepository.create.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.find.mockReset();
    mockRepository.save.mockReset();
  });

  describe('Buscar Estoque', () => {
    it('Deve retornar uma lista de estoques por name', async () => {
      const estoque = TestUtil.giveMeAValidEstoque();
      mockRepository.find.mockReturnValue([estoque, estoque]);
      const estoques = await controller.buscar({ nome: estoque.nome });
      expect(estoques).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar uma lista de estoques por faixa de quantidade', async () => {
      const estoque = TestUtil.giveMeAValidEstoque();
      mockRepository.find.mockReturnValue([estoque, estoque]);
      const estoques = await controller.buscar({
        quantidadeDe: estoque.quantidade - 2,
        quantidadeAte: estoque.quantidade + 2,
      });
      expect(estoques).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar uma lista de estoques por faixa valor', async () => {
      const estoque = TestUtil.giveMeAValidEstoque();
      mockRepository.find.mockReturnValue([estoque, estoque]);
      const estoques = await controller.buscar({
        valorDe: estoque.valorUnitario,
        valorAte: estoque.valorUnitario,
      });
      expect(estoques).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar uma lista de estoque com todos os filtros', async () => {
      const estoque = TestUtil.giveMeAValidEstoque();
      const estoque2 = TestUtil.giveMeAValidEstoque();
      estoque2.excluido = true;
      // não retornar estoque2 por este estar excluido
      mockRepository.find.mockReturnValue([estoque, estoque]);
      const estoques = await controller.buscar({
        quantidadeDe: estoque.quantidade - 2,
        quantidadeAte: estoque.quantidade + 2,
        valorDe: estoque.valorUnitario,
        valorAte: estoque.valorUnitario,
        nome: estoque.nome,
      });
      expect(estoques).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('Criar novo estoque', () => {
    it('Deve criar um novo estoque', async () => {
      const estoque = TestUtil.giveMeAValidEstoque();
      mockRepository.save.mockReturnValue(estoque);
      mockRepository.create.mockReturnValue(estoque);
      const savedEstoque = await controller.criar(estoque);
      expect(savedEstoque).toMatchObject(estoque);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('Atualizar usuário', () => {
    it('Deve atualizar usuário', async () => {
      const estoque = TestUtil.giveMeAValidEstoque();
      mockRepository.save.mockReturnValue(estoque);
      mockRepository.create.mockReturnValue(estoque);
      mockRepository.findOne.mockReturnValue(estoque);
      const updatedEstoque = await controller.atualizar(estoque.id, estoque);
      expect(updatedEstoque).toMatchObject(estoque);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar erro dizendo que não encontrou usuário', async () => {
      mockRepository.save.mockReturnValue(null);
      mockRepository.create.mockReturnValue(null);
      mockRepository.findOne.mockReturnValue(null);
      const estoque = TestUtil.giveMeAValidEstoque();
      await controller.atualizar(10, estoque).catch((e) => {
        expect(e).toBeInstanceOf(BadRequestException);
      });
      expect(mockRepository.create).toHaveBeenCalledTimes(0);
      expect(mockRepository.save).toHaveBeenCalledTimes(0);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Deletar estoque', () => {
    it('Deve excluir estoque', async () => {
      const estoque = TestUtil.giveMeAValidEstoque();
      mockRepository.findOne.mockReturnValue(estoque);
      mockRepository.save.mockReturnValue(estoque);
      const isExcluido = await controller.deletar(estoque.id);
      expect(isExcluido).toBe(true);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it('Deve retornar um erro ao tentar excluir estoque inexistente', async () => {
      const estoque = TestUtil.giveMeAValidEstoque();
      mockRepository.findOne.mockReturnValue(null);
      await controller.deletar(777).catch((e) => {
        expect(e).toBeInstanceOf(BadRequestException);
      });
      expect(mockRepository.save).toHaveBeenCalledTimes(0);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
