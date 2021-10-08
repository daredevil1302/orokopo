import { AuthService } from './../auth/auth.service';
import { CreateItemDto } from './dto/createItem.dto';
import { ItemsService } from './items.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Item } from 'src/entities/item.entity';
import { CategoriesService } from './categories.service';

@Controller('items')
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

  @Get('/:id')
  async getItem(@Param('id') id: number): Promise<Item> {
    return this.itemsService.getItemById(id);
  }

  @Post('/createitem')
  async createItem(@Body() createItemDto: CreateItemDto): Promise<Item> {
    const user = await this.authService.getUserById(createItemDto.userId);
    const category = await this.categoriesService.getCategoryById(
      createItemDto.categoryId,
    );
    return this.itemsService.createItem(createItemDto, user, category);
  }
}
