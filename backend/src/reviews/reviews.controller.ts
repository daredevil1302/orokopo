import { AuthService } from './../auth/auth.service';
import { ReviewsService } from './reviews.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateReviewDto } from './dto/createReview.dto';
import { Review } from 'src/entities/review.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private reviewsService: ReviewsService,
    private authService: AuthService,
  ) {}

  @Post('/createReview')
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    const user = await this.authService.getUserById(createReviewDto.userId);
    return this.reviewsService.createReview(createReviewDto, user);
  }
}
