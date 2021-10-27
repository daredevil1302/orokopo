import { UpdatePassDto } from './dto/updatePass.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    return this.usersRepository.createUser(signUpDto);
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; user: User }> {
    const { email, password } = signInDto;
    const user = await this.usersRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken, user };
    } else {
      throw new UnauthorizedException('Check your login credentials');
    }
  }

  async changePassword(user: User, updatePass: UpdatePassDto): Promise<User> {
    return await this.usersRepository.changePassword(user, updatePass);
  }

  async getUserById(id: number): Promise<User> {
    return await this.usersRepository.findOne(id, {
      relations: ['items', 'rents', 'reviews'],
    });
  }
}
