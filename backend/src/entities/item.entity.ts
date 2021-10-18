import { Category } from './category.entity';
import { Rent } from './rent.entity';
import { User } from './user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('item')
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  delivery: boolean;

  @Column()
  cancellation: boolean;

  @Column({ nullable: true })
  rating: number;

  @Column()
  imageUrl: string;

  @ManyToOne(() => User, (user) => user.items, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToOne(() => Rent, (rent) => rent.item)
  rent: Rent;

  @ManyToMany(() => Category, (category) => category.items)
  @JoinTable()
  categories: Category[];
}
