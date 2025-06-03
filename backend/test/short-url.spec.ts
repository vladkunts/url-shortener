import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ShortUrlService (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a short URL with a unique alias', async () => {
    const res = await request(app.getHttpServer())
      .post('/shorten')
      .send({ originalUrl: 'https://example.com', alias: 'unique123' });
    expect(res.status).toBe(201);
    expect(res.body.shortUrl).toBe('unique123');
  });

  // Add more tests as needed
});