import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Episode } from "../episode/episode.entity";
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

    @OneToMany(() => Episode, episode => episode.season)
    episodes: Episode[];
}

