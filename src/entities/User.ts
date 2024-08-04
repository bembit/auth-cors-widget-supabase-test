// @Entity()
// export class User {
//     @PrimaryGeneratedColumn('uuid')
//     id!: string;

//     @Column({ unique: true })
//     username!: string;

//     @Column({ unique: true })
//     email!: string;

//     @Column()
//     password!: string;

//     @CreateDateColumn()
//     createdAt!: Date;

//     @BeforeInsert()
//     async hashPassword() {
//         this.password = await bcrypt.hash(this.password, 10);
//     }

//     async validatePassword(password: string): Promise<boolean> {
//         return bcrypt.compare(password, this.password);
//     }
// }

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserPreference } from './UserPreference';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @OneToMany(() => UserPreference, preference => preference.user)
  preferences!: UserPreference[];
}
