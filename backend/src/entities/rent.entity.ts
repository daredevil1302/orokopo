import { Item } from './item.entity';
import { User } from './user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Rent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date_from: Date;

  @Column()
  date_to: Date;

  @ManyToOne(() => User, (user) => user.rents, { onDelete: 'SET NULL' })
  user: User;

  @OneToOne(() => Item, (item) => item.rent, { onDelete: 'SET NULL' })
  @JoinColumn()
  item: Item;
}
