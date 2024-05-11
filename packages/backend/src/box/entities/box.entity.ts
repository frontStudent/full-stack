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

  @Column({
    default: '默认内容1',
    nullable: true,
    comment: '盒子富文本内容，当为图片时此字段为空',
  })
  content: string;

  @Column({
    default: '',
    nullable: true,
    comment: '图片路径',
  })
  src: string;

  @Column({
    type: 'simple-json',
    comment: '盒子的初始化位置和大小',
  })
  initInfo: BoxBaseInfo;

  @Column({
    type: 'simple-json',
    comment: '盒子的最新位置和大小',
    nullable: true,
  })
  lastInfo: BoxBaseInfo;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
