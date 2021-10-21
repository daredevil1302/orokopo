import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from './../auth/auth.service';
import { ReviewsService } from './reviews.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReviewDto } from './dto/createReview.dto';
import { Review } from 'src/entities/review.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('reviews')
@UseGuards(AuthGuard())
export class ReviewsController {
  constructor(
    private reviewsService: ReviewsService,
    private authService: AuthService,
  ) {}

  @Post('/createReview')
  @ApiBody({ type: CreateReviewDto })
  @ApiBearerAuth()
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    const user = await this.authService.getUserById(createReviewDto.userId);
    return this.reviewsService.createReview(createReviewDto, user);
  }
}
