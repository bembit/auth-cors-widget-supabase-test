import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class UserCorsPreference {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: 'http://localhost:3000' })
  domain!: string;

  @ManyToOne(() => User, user => user.corsPreferences, {
    onDelete: 'CASCADE',
  })
  user!: User;
}

// @ManyToOne(() => User, user => user.corsPreferences)
// user: User;
