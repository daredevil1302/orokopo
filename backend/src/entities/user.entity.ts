import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  dinamo: string;
}
