//     @BeforeInsert()
//     async hashPassword() {
//         this.password = await bcrypt.hash(this.password, 10);
//     }

//     async validatePassword(password: string): Promise<boolean> {
//         return bcrypt.compare(password, this.password);
//     }
// }

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { UserPreference } from './UserPreference';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ unique: true })
	username!: string;

	// could generate a random email if not provided
	// swap to username anyway
	@Column({ unique: false, default: 'hello@example.com' })
	email!: string;

	@Column()
	password!: string;

	@CreateDateColumn()
    createdAt!: Date;

	@OneToMany(() => UserPreference, preference => preference.user)
	preferences!: UserPreference[];
}
