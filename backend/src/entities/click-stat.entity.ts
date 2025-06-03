import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { ShortUrl } from './short-url.entity';

@Entity()
export class ClickStat {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  clickedAt!: Date;

  @Column()
  ip!: string;

  @ManyToOne(() => ShortUrl, url => url.stats, { onDelete: 'CASCADE' })
  shortUrl!: ShortUrl;
}