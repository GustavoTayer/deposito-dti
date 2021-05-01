import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstoqueModule } from './estoque/estoque.module';

@Module({
  imports: [TypeOrmModule.forRoot(), EstoqueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
