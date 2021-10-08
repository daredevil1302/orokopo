import { Category } from './../entities/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private categoriesRepository: CategoriesRepository,
  ) {}

  async getCategoryById(id: number): Promise<Category> {
    return await this.categoriesRepository.findOne(id, {
      relations: ['items'],
    });
  }
}
