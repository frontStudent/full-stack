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

  @Column({ default: 'section' })
  type: string;

  @Column({ default: '默认模块' })
  name: string;

  @Column({ default: '1' })
  showTitle: '0' | '1';

  @Column({ default: 'primary', comment: '模块样式' })
  titleStyle: string;

  @Column({ default: 550 })
  width: number;

  @Column({ default: 100 })
  height: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
