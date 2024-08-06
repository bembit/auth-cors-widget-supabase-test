import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class UserPreference {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: false })
  isChecked!: boolean;

  @OneToOne(() => User, user => user.preferences)
  @JoinColumn()
  user!: User;
}
