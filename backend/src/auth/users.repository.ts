import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(signUpDto: SignUpDto): Promise<void> {
    const {
      name,
      surname,
      street,
      city,
      zip,
      rating,
      phone,
      date,
      email,
      password,
    } = signUpDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      name,
      surname,
      street,
      city,
      zip,
      rating,
      phone,
      date,
      email,
      password: hashedPassword,
    });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User with the same e-mail already exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }
}
