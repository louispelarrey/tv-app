import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Role } from "../role/enums/role.enum";
import { Show } from "../show/show.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column('jsonb', {default: ['USER']})
  roles: Role[];

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @ManyToMany(() => Show, show => show.followedBy)
  followedShows: Show[];

  @ManyToMany(() => Show, show => show.watchedBy)
  watchedShows: Show[];

}
