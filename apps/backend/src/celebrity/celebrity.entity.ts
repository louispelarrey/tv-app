import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Show } from '../show/show.entity';

@Entity()
export class Celebrity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  role: string;

  @ManyToMany(() => Show , show => show.celebrities)
  shows: Show[];

}
