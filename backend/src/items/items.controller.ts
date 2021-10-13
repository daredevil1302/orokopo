import { UpdateItemDto } from './dto/updateItem.dto';
import { AuthService } from './../auth/auth.service';
import { CreateItemDto } from './dto/createItem.dto';
import { ItemsService } from './items.service';
import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Item } from 'src/entities/item.entity';
import { CategoriesService } from './categories.service';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';

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
    const categories = await this.categoriesService.getCategoryByIds(
      createItemDto.categoryIds,
    );
    return this.itemsService.createItem(createItemDto, user, categories);
  }

  @Patch(':id')
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
