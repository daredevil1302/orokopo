import { ItemsService } from './../items/items.service';
import { RentsService } from './rents.service';
import { AuthService } from './../auth/auth.service';
import { Body, Controller, Delete, Post, Param } from '@nestjs/common';
import { CreateRentDto } from './dto/create-rent.dto';
import { Rent } from 'src/entities/rent.entity';

@Controller('rents')
export class RentsController {
  constructor(
    private authService: AuthService,
    private itemsService: ItemsService,
    private rentsService: RentsService,
  ) {}

  @Post('/createRent')
  async createRent(@Body() createRentDto: CreateRentDto): Promise<Rent> {
    const user = await this.authService.getUserById(createRentDto.userId);
    const item = await this.itemsService.getItemById(createRentDto.itemId);

    return this.rentsService.createRent(createRentDto, user, item);
  }

  @Delete('/:id/cancel')
  deleteItem(@Param('id') id: number): Promise<void> {
    return this.rentsService.cancelRent(id);
  }
}
