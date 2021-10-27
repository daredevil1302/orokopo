import { UpdatePassDto } from './dto/updatePass.dto';
import { GetUser } from './get-user.decorator';
import { User } from './../entities/user.entity';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';

import { SignUpDto } from './dto/signup.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { number } from '@hapi/joi';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Fetches an user with the provided ID',
  })
  // @ApiParam({
  //   name: 'User identifier',
  //   required: true,
  //   description: 'User ID passed as a Param',
  //   schema: { type: 'string' },
  // })
  getUserById(@Param('id') id: number): Promise<User> {
    return this.authService.getUserById(id);
  }

  @Post('/signup')
  @ApiCreatedResponse({ description: 'User registration' })
  @ApiBearerAuth()
  @ApiBody({ type: SignUpDto })
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @Patch('/changepass')
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 200, description: 'User registration' })
  @ApiBody({ type: UpdatePassDto })
  changePassword(
    @GetUser() user: User,
    @Body() updatePass: UpdatePassDto,
  ): Promise<User> {
    return this.authService.changePassword(user, updatePass);
  }

  @Post('/signin')
  @ApiOkResponse({ description: 'User login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: SignInDto })
  signIn(
    @Body() signInDto: SignInDto,
  ): Promise<{ accessToken: string; user: User }> {
    return this.authService.signIn(signInDto);
  }
}
