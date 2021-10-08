import { Rent } from 'src/entities/rent.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Rent)
export class RentsRepository extends Repository<Rent> {}
