import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({default: '默认用户'})
  name: string;

  @Column({default: '123456'})
  password: string;
}
