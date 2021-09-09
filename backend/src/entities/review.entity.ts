import { User } from './user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  description: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
}
