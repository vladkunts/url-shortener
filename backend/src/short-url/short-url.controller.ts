import { Controller, Post, Body, Get, Param, Delete, Req, Res, NotFoundException } from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { Request, Response } from 'express';

@Controller()
export class ShortUrlController {
  constructor(private readonly service: ShortUrlService) {}

  @Post('shorten')
  async createShortUrl(@Body() dto: CreateShortUrlDto) {
    return this.service.createShortUrl(dto);
  }

  @Get('short-urls')
  async findAll() {
    return this.service.findAll();
  }

  @Get(':alias')
  async redirect(@Param('alias') alias: string, @Req() req: Request, @Res() res: Response) {
    const url = await this.service.getAndTrack(alias, req.ip ?? '');
    if (!url) throw new NotFoundException();
    return res.redirect(url.originalUrl);
  }

  @Get('info/:alias')
  async getInfo(@Param('alias') alias: string) {
    return this.service.getInfo(alias);
  }

  @Delete('delete/:alias')
  async delete(@Param('alias') alias: string) {
    return this.service.delete(alias);
  }

  @Get('analytics/:alias')
  async analytics(@Param('alias') alias: string) {
    return this.service.analytics(alias);
  }
}