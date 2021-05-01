import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Estoque {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  quantidade: number;

  @Column({ type: 'double precision' })
  valorUnitario: number;

  @Column({ default: false })
  excluido: boolean;
}
