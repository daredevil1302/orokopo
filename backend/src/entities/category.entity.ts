import { Item } from './item.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @ManyToMany(() => Item, (item) => item.categories)
  items: Item[];
}
