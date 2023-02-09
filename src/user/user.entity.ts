import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Posts } from '../post/post.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  resetToken: string;

  @OneToMany(() => Posts, (post) => post.user)
  post?: Posts[];

  @Column({ default: true })
  isActive: boolean;

  public async getUserJSON(this: any) {
    return {
      ...this,
    };
  }
}
