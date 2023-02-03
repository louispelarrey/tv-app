import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
import { Celebrity } from "../celebrity/celebrity.entity";
import { Episode } from "../episode/episode.entity";
import { Season } from "../season/season.entity";
import { User } from "../user/user.entity";

@Entity()
export class Show {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    imagePath: string;

    @OneToMany(() => Episode, episode => episode.show)
    episodes: Episode[];

    @OneToMany(() => Season, season => season.show)
    seasons: Season[];

    @ManyToMany(() => Celebrity, celebrity => celebrity.shows)
    celebrities: Celebrity[];

    @ManyToMany(() => User, user => user.followedShows)
    followedBy: User[];

    @ManyToMany(() => User, user => user.watchedShows)
    watchedBy: User[];

}
