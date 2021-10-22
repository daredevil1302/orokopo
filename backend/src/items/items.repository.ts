import { Category } from './../entities/category.entity';
import { FilterItemDto } from './dto/filterItem.dto';
import { User } from './../entities/user.entity';
import { Item } from './../entities/item.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Item)
export class ItemsRepository extends Repository<Item> {
  async getItems(filterItemDto: FilterItemDto): Promise<Item[]> {
    const { search } = filterItemDto;
    const query = this.createQueryBuilder('item')
      .leftJoinAndSelect('item.user', 'user')
      .leftJoinAndSelect('item.categories', 'categories');

    if (search) {
      query.andWhere(
        'LOWER(item.name) LIKE LOWER(:search) or LOWER(item.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    const items = await query.getMany();
    return items;
  }

  async getMyItems(user: User): Promise<Item[]> {
    const query = this.createQueryBuilder('items');

    query.where({ user });

    const items = await query.getMany();
    return items;
  }

  async getOtherItems(user: User): Promise<Item[]> {
    const query = this.createQueryBuilder('items').where(
      'items.userId != :id',
      { id: user.id },
    );
    // !query.where({ user });

    const items = await query.getMany();
    return items;
  }
}
