import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Draft } from 'src/draft/entities/draft.entity';
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
}
