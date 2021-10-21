import { User } from './../entities/user.entity';
import { RentsRepository } from './rents.repository';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
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

  async getRents(): Promise<Rent[]> {
    return await this.rentsRepository.find({ relations: ['user', 'item'] });
  }

  async getRent(id: number): Promise<Rent> {
    return await this.rentsRepository.findOne(id, {
      relations: ['user', 'item'],
    });
  }

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

  async cancelRent(id: number, user: User): Promise<void> {
    const foundRent = await this.getRent(id);

    if (foundRent && foundRent.user.id === user.id) {
      await this.rentsRepository.delete(id);
    } else {
      throw new NotAcceptableException('Invalid Rent');
    }
  }
}
