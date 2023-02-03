import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Show } from "../show/show.entity";

@Entity()
export class Season {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => Show, show => show.seasons)
    show: Show;
}

