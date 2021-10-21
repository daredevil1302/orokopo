import { User } from 'src/entities/user.entity';
import { Rent } from 'src/entities/rent.entity';
import { EntityRepository, Repository } from 'typeorm';
import { query } from 'express';

@EntityRepository(Rent)
export class RentsRepository extends Repository<Rent> {
  // async cancelRent(id: number, user): Promise<any> {
  //   const query = this.createQueryBuilder('rents')
  //     .where('rents.id = :id', {
  //       id: id,
  //     })
  //     .andWhere('rents.userId = :id', {
  //       id: user.id,
  //     });
  //   await query.delete();
  // }
}
