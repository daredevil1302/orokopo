import { Item } from './item.entity';
import { Rent } from './rent.entity';
import { Review } from './review.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 50 })
  surname: string;

  @Column('varchar', { length: 50 })
  @Exclude({ toPlainOnly: true })
  street: string;

  @Column('varchar', { length: 50 })
  @Exclude({ toPlainOnly: true })
  city: string;

  @Column('varchar', { length: 5 })
  @Exclude({ toPlainOnly: true })
  zip: string;

  @Column('varchar', { length: 10 })
  @Exclude({ toPlainOnly: true })
  phone: string;

  @Column('date')
  @Exclude({ toPlainOnly: true })
  date: Date;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  @Exclude({ toPlainOnly: true })
  email: string;

  @Column({ type: 'varchar', length: 75, nullable: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Rent, (rent) => rent.user)
  rents: Rent[];

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];
}
