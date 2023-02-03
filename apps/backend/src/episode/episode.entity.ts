import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Show } from "../show/show.entity";

@Entity()
export class Episode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => Show, show => show.episodes)
    show: Show;
}
