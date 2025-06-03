import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ShortUrl } from './entities/short-url.entity';
import { ClickStat } from './entities/click-stat.entity';
import { ShortUrlController } from './short-url/short-url.controller';
import { ShortUrlService } from './short-url/short-url.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [ShortUrl, ClickStat],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ShortUrl, ClickStat]),
  ],
  controllers: [ShortUrlController],
  providers: [ShortUrlService],
})
export class AppModule {}