import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShortUrl } from '../entities/short-url.entity';
import { ClickStat } from '../entities/click-stat.entity';
import { CreateShortUrlDto } from './dto/create-short-url.dto';

@Injectable()
export class ShortUrlService {
  constructor(
    @InjectRepository(ShortUrl) private shortUrlRepo: Repository<ShortUrl>,
    @InjectRepository(ClickStat) private clickStatRepo: Repository<ClickStat>,
  ) {}

  async createShortUrl(dto: CreateShortUrlDto) {
    let alias = dto.alias || Math.random().toString(36).substring(2, 8);
    if (await this.shortUrlRepo.findOne({ where: { alias } })) {
      throw new ConflictException('Alias already exists');
    }
    const shortUrl = this.shortUrlRepo.create({
      originalUrl: dto.originalUrl,
      alias,
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
    });
    await this.shortUrlRepo.save(shortUrl);
    return { shortUrl: alias };
  }

  async getAndTrack(alias: string, ip: string) {
    const url = await this.shortUrlRepo.findOne({ where: { alias } });
    if (!url) return null;
    if (url.expiresAt && url.expiresAt < new Date()) throw new NotFoundException();
    url.clickCount += 1;
    await this.shortUrlRepo.save(url);
    await this.clickStatRepo.save(this.clickStatRepo.create({ ip, shortUrl: url }));
    return url;
  }

  async getInfo(alias: string) {
    const url = await this.shortUrlRepo.findOne({ where: { alias } });
    if (!url) throw new NotFoundException();
    return {
      alias: url.alias,
      originalUrl: url.originalUrl,
      createdAt: url.createdAt,
      clickCount: url.clickCount ?? 0, // or url.clicks if that's the correct field
    };
  }

  async delete(alias: string) {
    const res = await this.shortUrlRepo.delete({ alias });
    if (!res.affected) throw new NotFoundException();
    return { deleted: true };
  }

  async analytics(alias: string) {
    const url = await this.shortUrlRepo.findOne({ where: { alias } });
    if (!url) throw new NotFoundException();
    const stats = await this.clickStatRepo.find({
      where: { shortUrl: { id: url.id } },
      order: { clickedAt: 'DESC' },
      take: 5,
    });
    return {
      clickCount: url.clickCount,
      last5: stats.map(s => s.ip),
    };
  }

  async findAll() {
    return this.shortUrlRepo.find();
  }
}