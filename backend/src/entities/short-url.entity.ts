import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { ClickStat } from './click-stat.entity';

@Entity()
export class ShortUrl {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  originalUrl!: string;

  @Column({ unique: true, length: 20 })
  alias!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt!: Date | null;

  @Column({ default: 0 })
  clickCount!: number;

  @OneToMany(() => ClickStat, stat => stat.shortUrl)
  stats!: ClickStat[];
}