import { Rent } from './rent.entity';
import { Review } from './review.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 50 })
  surname: string;

  @Column('varchar', { length: 50 })
  street: string;

  @Column('varchar', { length: 50 })
  city: string;

  @Column('varchar', { length: 5 })
  zip: string;

  @Column({ type: 'int', nullable: true })
  rating: number;

  @Column('varchar', { length: 10 })
  phone: string;

  @Column('date')
  date: Date;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 75, nullable: false })
  password: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Rent, (rent) => rent.user)
  rents: Rent[];
}
