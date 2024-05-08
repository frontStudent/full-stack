import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Section } from 'src/section/entities/section.entity';
import { BoxBaseInfo } from 'share/types';

@Entity()
export class Box {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Section, (sec) => sec.boxes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  section: Section;

  @Column({ default: '默认内容1' })
  content: string;

  @Column({
    type: 'simple-json',
  })
  initInfo: BoxBaseInfo;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
