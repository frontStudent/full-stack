import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Section } from 'src/section/entities/section.entity';
@Entity()
export class Template {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => User, (user) => user.templates)
  users: User[];

  @OneToMany(() => Section, (sec) => sec.draft)
  sections: Section[];

  @Column({ default: '默认草稿' })
  name: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
