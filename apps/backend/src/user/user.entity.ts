import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Show } from "../show/show.entity";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @ManyToMany(() => Show, show => show.followedBy)
  followedShows: Show[];

  @ManyToMany(() => Show, show => show.watchedBy)
  watchedShows: Show[];
}
