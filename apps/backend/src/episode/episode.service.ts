import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EpisodeDto } from './dto/episode.dto';
import { Episode } from './episode.entity';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>,
  ) { }

  async findAll(): Promise<Episode[]> {
    return await this.episodeRepository.find();
  }

  async findOne(id: number): Promise<Episode> {
    return await this.episodeRepository.findOne({ where: { id } });
  }

  async createEpisodeBySeason(id: number, episodeDto: EpisodeDto): Promise<Episode> {
    const episode = new Episode();
    episode.season.id = id;
    return await this.episodeRepository.save({ ...episode, ...episodeDto });
  }

  async updateEpisode(id: number, episodeDto: EpisodeDto): Promise<Episode> {
    const episode = await this.episodeRepository.findOne({ where: { id } });
    return await this.episodeRepository.save({ ...episode, ...episodeDto });
  }

  async deleteEpisode(id: number): Promise<Episode> {
    const episode = await this.episodeRepository.findOne({ where: { id } });
    return await this.episodeRepository.remove(episode);
  }
}
