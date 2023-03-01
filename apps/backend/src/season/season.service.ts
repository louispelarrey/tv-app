import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Show } from '../show/show.entity';
import { SeasonDto } from './dto/season.dto';
import { Season } from './season.entity';

@Injectable()
export class SeasonService {

  constructor(
    @InjectRepository(Season)
    private readonly seasonRepository: Repository<Season>,
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}

  async findAll(): Promise<Season[]> {
    return await this.seasonRepository.find();
  }

  async findOne(id: number): Promise<Season> {
    return await this.seasonRepository.findOne({ where: { id } });
  }

  async findByShow(id: number): Promise<Season[]> {
    const seasons = await this.seasonRepository.find({ relations: ["show"]});
    return seasons.filter(season => season.show.id == id);
  }

  async createSeason(seasonDto: SeasonDto): Promise<Season> {
    const season = new Season();
    season.name = seasonDto.name;
    season.description = seasonDto.description;
    const id = seasonDto.show
    const show = await this.showRepository.findOne({ where: { id } });
    season.show = show;

    return await this.seasonRepository.save(season);
  }

  async updateSeason(id: number, seasonDto: SeasonDto): Promise<Season> {
    const season = await this.seasonRepository.findOne({ where: { id } });
    season.name = seasonDto.name;
    season.description = seasonDto.description;

    return await this.seasonRepository.save(season);
  }

  async deleteSeason(id: number): Promise<Season> {
    const season = await this.seasonRepository.findOne({ where: { id } });
    return await this.seasonRepository.remove(season);
  }
}
