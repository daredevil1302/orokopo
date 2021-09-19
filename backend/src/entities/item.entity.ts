import { Category } from './category.entity';
import { Rent } from './rent.entity';
import { User } from './user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Item {
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

  @Column()
  rating: number;

  @ManyToOne(() => User, (user) => user.items, { onDelete: 'CASCADE' })
  user: User;

  @OneToOne(() => Rent, (rent) => rent.item)
  rent: Rent;

  @ManyToMany(() => Category, (category) => category.items)
  @JoinTable()
  categories: Category[];
}
