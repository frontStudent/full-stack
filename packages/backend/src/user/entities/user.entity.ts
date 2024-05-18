import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Draft } from 'src/draft/entities/draft.entity';
import { Template } from 'src/template/entities/template.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '默认用户' })
  name: string;

  @Column({ default: '123456' })
  password: string;

  @OneToMany(() => Draft, (draft) => draft.user)
  drafts: Draft[];

  @ManyToMany(() => Template, (template) => template.users)
  @JoinTable()
  templates: Template[]; 
}
