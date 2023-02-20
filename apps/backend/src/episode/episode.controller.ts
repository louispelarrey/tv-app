import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EpisodeDto } from './dto/episode.dto';
import { Episode } from './episode.entity';
import { EpisodeService } from './episode.service';

@Controller('episode')
export class EpisodeController {
  constructor(
    private readonly episodeService: EpisodeService,
  ) {}

  @Get()
  async findAll(): Promise<Episode[]> {
    return await this.episodeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Episode> {
    return await this.episodeService.findOne(id);
  }

  @Post(':id')
  async createEpisodeBySeason(@Param('id') id: number, @Body() episodeDto: EpisodeDto): Promise<Episode> {
    return await this.episodeService.createEpisodeBySeason(id, episodeDto);
  }

  @Put(':id')
  async updateEpisode(@Param('id') id: number, @Body() episodeDto: EpisodeDto): Promise<Episode> {
    return await this.episodeService.updateEpisode(id, episodeDto);
  }

  @Delete(':id')
  async deleteEpisode(@Param('id') id: number): Promise<Episode> {
    return await this.episodeService.deleteEpisode(id);
  }
}
