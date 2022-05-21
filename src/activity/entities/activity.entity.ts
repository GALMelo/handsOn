import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Activity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @CreateDateColumn({name: 'created_at'})
    created_at: Date

    @UpdateDateColumn({name: 'updated_at'})
    updated_at: Date

    @Column({type: Boolean})
    done: Boolean

    @ManyToOne(() => User, (users) => users.activities)
    user: User;
}


