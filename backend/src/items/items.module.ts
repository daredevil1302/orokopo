import { AuthModule } from './../auth/auth.module';
import { AuthService } from './../auth/auth.service';
import { ItemsRepository } from './items.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemsRepository, CategoriesRepository]),
    AuthModule,
  ],
  controllers: [ItemsController],
  providers: [ItemsService, CategoriesService],
  exports: [ItemsService],
})
export class ItemsModule {}
