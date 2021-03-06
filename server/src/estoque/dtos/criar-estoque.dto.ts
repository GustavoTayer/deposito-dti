import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CriarEstoqueDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  @Min(0)
  quantidade: number;

  @IsNumber()
  @Min(0)
  valorUnitario: number;
}
