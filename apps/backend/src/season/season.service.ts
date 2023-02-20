import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeasonDto } from './dto/season.dto';
import { Season } from './season.entity';

@Injectable()
export class SeasonService {
  constructor(
    @InjectRepository(Season)
    private readonly seasonRepository: Repository<Season>,
  ) {}

  async findAll(): Promise<Season[]> {
    return await this.seasonRepository.find();
  }

  async findOne(id: number): Promise<Season> {
    return await this.seasonRepository.findOne({ where: { id } });
  }

  async createSeason(seasonDto: SeasonDto): Promise<Season> {
    const season = new Season();
    season.name = seasonDto.name;
    season.description = seasonDto.description;

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
