import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { ShowDto } from './dto/show.dto';
import { Show } from './show.entity';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<Show[]> {
    return await this.showRepository.find({ relations: ['followedBy'], order: { id: 'ASC' } });
  }

  async findAllFollowed(userId: number): Promise<Show[]> {
    const shows = await this.showRepository.find({ relations: ['followedBy'], order: { id: 'ASC' } });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return shows.filter(show => show.followedBy.includes(user));
  }

  async findById(id: number): Promise<Show> {
    return await this.showRepository.findOne({ where: { id }, relations: ['followedBy'] });
  }

  async create(showDto: ShowDto): Promise<Show> {
    const show = new Show();
    show.name = showDto.name;
    show.description = showDto.description;
    return await this.showRepository.save(show);
  }

  async update(id: number, showDto: ShowDto): Promise<Show> {
    const show = await this.showRepository.findOne({ where: { id }, relations: ['followedBy'] });
    show.name = showDto.name;
    show.description = showDto.description;
    return await this.showRepository.save(show);
  }

  async delete(id: number): Promise<Show> {
    const show = await this.showRepository.findOne({ where: { id: id } });
    return await this.showRepository.remove(show);
  }

  async follow(id: number, userId: number): Promise<boolean> {
    const show = await this.showRepository.findOne({ where: { id }, relations: ['followedBy'] });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    //toggle follow
    let add = true;
    if (show.followedBy.find(u => u.id === user.id)) {
      show.followedBy = show.followedBy.filter(u => u.id !== user.id);
      add = false;
    } else {
      show.followedBy.push(user);
      add = true;
    }
    await this.showRepository.save(show);
    return add;
  }

}
