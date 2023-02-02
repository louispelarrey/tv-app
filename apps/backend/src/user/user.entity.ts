import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude({ toPlainOnly: true })
    password: string;

    // @Column({ default: JSON.stringify([Role.User])})
    // role: string;
}
