import { Category } from './../entities/category.entity';

import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {}
