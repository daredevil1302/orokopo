import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

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

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;
    const user = await this.usersRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Check your login credentials');
    }
  }
}
