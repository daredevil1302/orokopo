import { User } from './../entities/user.entity';
import { Item } from './../entities/item.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Item)
export class ItemsRepository extends Repository<Item> {
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
