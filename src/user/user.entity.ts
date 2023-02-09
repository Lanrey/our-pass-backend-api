import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ default: true })
  isActive: boolean;

  public async getUserJSON(this: any) {
    return {
      ...this,
    };
  }
}
