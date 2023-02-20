import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShowDto } from './dto/show.dto';
import { Show } from './show.entity';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) { }

  async findAll(): Promise<Show[]> {
    return await this.showRepository.find();
  }

  async findById(id: number): Promise<Show> {
    return await this.showRepository.findOne({ where: { id } });
  }

  async create(showDto: ShowDto): Promise<Show> {
    const show = new Show();
    show.name = showDto.name;
    show.description = showDto.description;
    show.imagePath = showDto.imagePath;
    return await this.showRepository.save(show);
  }

  async update(id: number, showDto: ShowDto): Promise<Show> {
    const show = await this.showRepository.findOne({ where: { id } });
    show.name = showDto.name;
    show.description = showDto.description;
    show.imagePath = showDto.imagePath;
    return await this.showRepository.save(show);
  }

  async delete(id: number): Promise<Show> {
    const show = await this.showRepository.findOne({ where: { id } });
    return await this.showRepository.remove(show);
  }

}
