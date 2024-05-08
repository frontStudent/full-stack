import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Draft } from 'src/draft/entities/draft.entity';
import { Box } from 'src/box/entities/box.entity';

@Entity()
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Draft, (draft) => draft.sections, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  draft: Draft;

  @OneToMany(() => Box, (box) => box.section)
  boxes: Box[];

  @Column({ default: '默认模块' })
  name: string;

  @Column({ default: 'primary' })
  titleStyle: string; // 标题样式

  @Column({ default: 550 })
  width: number; // 宽度

  @Column({ default: 100 })
  height: number; // 高度

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
