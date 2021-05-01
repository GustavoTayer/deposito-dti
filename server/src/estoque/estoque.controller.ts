import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AtualizarEstoqueDto } from './dtos/atualizar-estoque.dto';
import { BuscarEstoqueDto } from './dtos/buscar-estoque.dto';
import { CriarEstoqueDto } from './dtos/criar-estoque.dto';
import { Estoque } from './estoque.entity';
import { EstoqueService } from './estoque.service';

@ApiTags('Estoque')
@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Get()
  buscar(@Query() buscarEstoqueDto: BuscarEstoqueDto): Promise<Estoque[]> {
    return this.estoqueService.buscar(buscarEstoqueDto);
  }

  @Post()
  criar(@Body() criarDto: CriarEstoqueDto): Promise<Estoque> {
    return this.estoqueService.criar(criarDto);
  }

  @Put(':id')
  atualizar(
    @Param('id') id: number,
    @Body() atualizarDto: AtualizarEstoqueDto,
  ): Promise<Estoque> {
    return this.estoqueService.update(id, atualizarDto);
  }

  @Delete(':id')
  deletar(@Param('id') id: number) {
    return this.estoqueService.deletar(id);
  }
}
