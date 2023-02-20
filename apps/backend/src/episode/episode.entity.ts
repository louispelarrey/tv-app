import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Season } from "../season/season.entity";
import { Show } from "../show/show.entity";

@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Season, season => season.episodes)
  season: Season;
}
