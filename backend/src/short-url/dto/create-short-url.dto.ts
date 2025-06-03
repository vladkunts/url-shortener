import { IsString, IsOptional, IsUrl, MaxLength, IsDateString } from 'class-validator';

export class CreateShortUrlDto {
  @IsUrl()
  originalUrl!: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  alias?: string;
}