import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
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
  imagePath?: string|null;

  @OneToMany(() => Season, season => season.show)
  seasons: Season[];

  @ManyToMany(() => Celebrity, celebrity => celebrity.shows, { cascade: true })
  @JoinTable()
  celebrities: Celebrity[];

  @ManyToMany(() => User, user => user.followedShows, { cascade: true })
  @JoinTable()
  followedBy: User[];

  @ManyToMany(() => User, user => user.watchedShows, { cascade: true })
  @JoinTable()
  watchedBy: User[];

}
