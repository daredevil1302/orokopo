import { User } from './../entities/user.entity';
import { UpdateItemDto } from './dto/updateItem.dto';
import { AuthService } from './../auth/auth.service';
import { CreateItemDto } from './dto/createItem.dto';
import { ItemsService } from './items.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Item } from 'src/entities/item.entity';
import { CategoriesService } from './categories.service';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('items')
@UseGuards(AuthGuard())
export class ItemsController {
  constructor(
    private itemsService: ItemsService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
  ) {}

  @Get('/all')
  async getItems(): Promise<Item[]> {
    return this.itemsService.getItems();
  }

  @Get('/my')
  async getMyItems(@GetUser() user: User): Promise<Item[]> {
    return this.itemsService.getMyItems(user);
  }

  @Get('/other')
  async getOtherItems(@GetUser() user: User): Promise<Item[]> {
    return this.itemsService.getOtherItems(user);
  }

  @Get('/:id')
  async getItem(@Param('id') id: number): Promise<Item> {
    return this.itemsService.getItemById(id);
  }

  @Delete('/:id')
  deleteItem(@Param('id') id: number): Promise<void> {
    return this.itemsService.deleteItem(id);
  }
  @Post('/createitem')
  async createItem(@Body() createItemDto: CreateItemDto): Promise<Item> {
    const user = await this.authService.getUserById(createItemDto.userId);
    const categories = await this.categoriesService.getCategoryByIds(
      createItemDto.categoryIds,
    );
    return this.itemsService.createItem(createItemDto, user, categories);
  }

  @Patch('/:id/update')
  async updateItem(
    @Param('id') id: number,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<Item> {
    const categories = await this.categoriesService.getCategoryByIds(
      updateItemDto.categoryIds,
    );
    const foundItem = await this.itemsService.getItemById(id);

    return this.itemsService.updateItem(
      id,
      updateItemDto,
      categories,
      foundItem,
    );
  }
}
