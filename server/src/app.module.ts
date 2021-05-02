import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstoqueModule } from './estoque/estoque.module';

@Module({
  imports: [TypeOrmModule.forRoot(), EstoqueModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
