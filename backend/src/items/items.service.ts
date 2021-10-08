import { Category } from './../entities/category.entity';
import { CreateItemDto } from './dto/createItem.dto';
import { ItemsRepository } from './items.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/entities/item.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemsRepository)
    private itemsRepository: ItemsRepository,
  ) {}

  async getItems(): Promise<Item[]> {
    return await this.itemsRepository.find();
  }

  async getItemById(id: number): Promise<Item> {
    return await this.itemsRepository.findOne(id, {
      relations: ['user', 'categories'],
    });
  }

  async createItem(
    createItemDto: CreateItemDto,
    user: User,
    category: Category,
  ): Promise<Item> {
    const newItem = await this.itemsRepository.save({
      name: createItemDto.name,
      description: createItemDto.description,
      price: createItemDto.price,
      delivery: createItemDto.delivery,
      cancellation: createItemDto.cancellation,
      rating: createItemDto.rating,
      imageUrl: createItemDto.imageUrl,
    });

    user.items = [...user.items, newItem];
    await user.save();

    category.items = [...category.items, newItem];
    await category.save();

    return newItem;
  }
}
