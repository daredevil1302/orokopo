import { AuthModule } from './../auth/auth.module';
import { ItemsModule } from './../items/items.module';
import { RentsRepository } from './rents.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RentsController } from './rents.controller';
import { RentsService } from './rents.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RentsRepository]),
    ItemsModule,
    AuthModule,
  ],
  controllers: [RentsController],
  providers: [RentsService],
})
export class RentsModule {}
