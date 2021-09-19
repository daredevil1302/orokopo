import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { ConfigOption } from './config-option';
import { User } from './entities/user.entity';
import { Review } from './entities/review.entity';
import { Rent } from './entities/rent.entity';
import { Item } from './entities/item.entity';
import { Category } from './entities/category.entity';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: Number(configService.get('DB_PORT')),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
          migrations: ['dist/migrations/**/*{.ts,.js}'],
          synchronize: false,
          cli: {
            entitiesDir: 'src/entities',
            migrationsDir: 'src/migrations',
          },
        };
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}
