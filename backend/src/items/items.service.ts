import { UpdateItemDto } from './dto/updateItem.dto';
import { Category } from './../entities/category.entity';
import { CreateItemDto } from './dto/createItem.dto';
import { ItemsRepository } from './items.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/entities/item.entity';
import { User } from 'src/entities/user.entity';
import { from, Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';

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
    const found = await this.itemsRepository.findOne(id, {
      relations: ['user', 'categories'],
    });
    if (!found) {
      throw new NotFoundException(`Item with ID "${id}" not found`);
    }

    return found;
  }

  async createItem(
    createItemDto: CreateItemDto,
    user: User,
    categories: Array<Category>,
  ): Promise<Item> {
    const newItem = await this.itemsRepository.save({
      name: createItemDto.name,
      description: createItemDto.description,
      price: createItemDto.price,
      delivery: createItemDto.delivery,
      cancellation: createItemDto.cancellation,
      rating: createItemDto.rating,
      imageUrl: createItemDto.imageUrl,
      categories: categories,
    });

    user.items = [...user.items, newItem];
    await user.save();

    return newItem;
  }

  async updateItem(
    id: number,
    updateItemDto: UpdateItemDto,
    categories: Array<Category>,
    foundItem: Item,
  ): Promise<Item> {
    const {
      name,
      description,
      price,
      delivery,
      cancellation,
      rating,
      categoryIds,
      imageUrl,
    } = updateItemDto;

    foundItem.name = name;
    foundItem.description = description;
    foundItem.price = price;
    foundItem.delivery = delivery;
    foundItem.cancellation = cancellation;
    foundItem.rating = rating;
    foundItem.categories = categories;

    await this.itemsRepository.save(foundItem);
    return foundItem;
    //Odustati od ovog observable + reopsitory.update rjesenja i vratiti staro
  }
}