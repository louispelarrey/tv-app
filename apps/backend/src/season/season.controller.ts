import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../role/decorators/roles.decorator';
import { Role } from '../role/enums/role.enum';
import { RoleGuard } from '../role/guard/role.guard';
import { SeasonDto } from './dto/season.dto';
import { Season } from './season.entity';
import { SeasonService } from './season.service';

@Controller('season')
export class SeasonController {

  constructor(
    private readonly seasonService: SeasonService,
  ){}

  @Get()
  async findAll(): Promise<Season[]> {
    return await this.seasonService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Season> {
    return await this.seasonService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Post()
  async createSeason(@Body() seasonDto: SeasonDto): Promise<Season> {
    return await this.seasonService.createSeason(seasonDto);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async updateSeason(@Param('id') id: number, @Body() seasonDto: SeasonDto): Promise<Season> {
    return await this.seasonService.updateSeason(id, seasonDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async deleteSeason(@Param('id') id: number): Promise<Season> {
    return await this.seasonService.deleteSeason(id);
  }
}
