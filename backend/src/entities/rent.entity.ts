import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date_from: Date;
}
