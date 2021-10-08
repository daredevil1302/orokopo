import { User } from './../entities/user.entity';
import { ReviewsRepository } from './reviews.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewDto } from './dto/createReview.dto';
import { Review } from 'src/entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewsRepository)
    private reviewsRepository: ReviewsRepository,
  ) {}

  async createReview(
    createReviewDto: CreateReviewDto,
    user: User,
  ): Promise<Review> {
    const newReview = await this.reviewsRepository.save({
      rating: createReviewDto.rating,
      description: createReviewDto.description,
      date: createReviewDto.date,
    });

    user.reviews = [...user.reviews, newReview];
    await user.save();

    return newReview;
  }
}
