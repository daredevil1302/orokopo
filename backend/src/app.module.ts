import { User } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

import { configService } from './config/config.service';
import { ItemsModule } from './items/items.module';
import { RentsModule } from './rents/rents.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    ItemsModule,
    RentsModule,
    ReviewsModule,
  ],
})
export class AppModule {}
