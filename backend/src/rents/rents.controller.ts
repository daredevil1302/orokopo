import { User } from 'src/entities/user.entity';
import { ItemsService } from './../items/items.service';
import { RentsService } from './rents.service';
import { AuthService } from './../auth/auth.service';
import {
  Body,
  Controller,
  Delete,
  Post,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CreateRentDto } from './dto/create-rent.dto';
import { Rent } from 'src/entities/rent.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('rents')
@UseGuards(AuthGuard())
export class RentsController {
  constructor(
    private authService: AuthService,
    private itemsService: ItemsService,
    private rentsService: RentsService,
  ) {}

  @Post('/createRent')
  @ApiCreatedResponse({ status: 201, description: 'Created a rent' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateRentDto })
  async createRent(@Body() createRentDto: CreateRentDto): Promise<Rent> {
    const user = await this.authService.getUserById(createRentDto.userId);
    const item = await this.itemsService.getItemById(createRentDto.itemId);

    return this.rentsService.createRent(createRentDto, user, item);
  }

  @Get('/allrents')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Fetches all rents' })
  async getRents(): Promise<Rent[]> {
    return this.rentsService.getRents();
  }

  @Get(':id/rent')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Fetches a specific rent' })
  async getRent(@Param() id: number): Promise<Rent> {
    return this.rentsService.getRent(id);
  }

  @Delete(':id/cancel')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Successfully cancels a rent',
  })
  async cancelRent(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.rentsService.cancelRent(id, user);
  }
}
