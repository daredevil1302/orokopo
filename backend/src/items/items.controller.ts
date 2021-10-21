import { JwtAuthGuard } from './../auth/jwt-auth.guard';
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
  Req,
  UseGuards,
} from '@nestjs/common';
import { Item } from 'src/entities/item.entity';
import { CategoriesService } from './categories.service';

import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('items')
export class ItemsController {
  constructor(
    private itemsService: ItemsService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
  ) {}

  @Get('/all')
  @ApiResponse({
    status: 200,
    description: 'Fetches all items',
  })
  async getItems(): Promise<Item[]> {
    return this.itemsService.getItems();
  }

  @Get('/my')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Fetches items owned by the current user',
  })
  @ApiBearerAuth()
  async getMyItems(@GetUser() user: User): Promise<Item[]> {
    return this.itemsService.getMyItems(user);
  }

  @Get('/other')
  @ApiResponse({
    status: 200,
    description: 'Fetches items not owned by the current user',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getOtherItems(@GetUser() user: User): Promise<Item[]> {
    return this.itemsService.getOtherItems(user);
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Fetches an item with the provided ID',
  })
  async getItem(@Param('id') id: number): Promise<Item> {
    return this.itemsService.getItemById(id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Item successfully deleted',
  })
  deleteItem(@Param('id') id: number): Promise<void> {
    return this.itemsService.deleteItem(id);
  }

  @Post('/createitem')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Creates an item',
  })
  @ApiBody({ type: CreateItemDto })
  async createItem(@Body() createItemDto: CreateItemDto): Promise<Item> {
    const user = await this.authService.getUserById(createItemDto.userId);
    const categories = await this.categoriesService.getCategoryByIds(
      createItemDto.categoryIds,
    );
    return this.itemsService.createItem(createItemDto, user, categories);
  }

  @Patch('/:id/update')
  @ApiResponse({
    status: 200,
    description: 'Updates an Item',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiBody({ type: UpdateItemDto })
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
