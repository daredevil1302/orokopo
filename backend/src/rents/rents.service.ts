import { User } from './../entities/user.entity';
import { RentsRepository } from './rents.repository';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Rent } from 'src/entities/rent.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRentDto } from './dto/create-rent.dto';
import { Item } from 'src/entities/item.entity';

@Injectable()
export class RentsService {
  constructor(
    @InjectRepository(RentsRepository)
    private rentsRepository: RentsRepository,
  ) {}

  async createRent(
    createRentDto: CreateRentDto,
    user: User,
    item: Item,
  ): Promise<Rent> {
    if (user.id !== item.user.id) {
      const newRent = await this.rentsRepository.save({
        date_from: createRentDto.date_from,
        date_to: createRentDto.date_to,
      });

      user.rents = [...user.rents, newRent];
      await user.save();

      item.rent = newRent;
      await item.save();

      return newRent;
    } else {
      throw new NotAcceptableException(
        'User can not rent an item from himself',
      );
    }
  }
}
