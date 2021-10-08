import { Review } from './../entities/review.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Review)
export class ReviewsRepository extends Repository<Review> {}
