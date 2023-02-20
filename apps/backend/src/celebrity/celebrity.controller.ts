import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../role/decorators/roles.decorator';
import { Role } from '../role/enums/role.enum';
import { RoleGuard } from '../role/guard/role.guard';
import { Celebrity } from './celebrity.entity';
import { CelebrityService } from './celebrity.service';
import { CelebrityDto } from './dto/celebrity.dto';

@Controller('celebrity')
export class CelebrityController {

  constructor(
    private readonly celebrityService: CelebrityService,
  ){}

  @Get()
  async findAll(): Promise<Celebrity[]> {
    return await this.celebrityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Celebrity> {
    return await this.celebrityService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Post()
  async createCelebrity(@Body() celebrityDto: CelebrityDto): Promise<Celebrity> {
    return await this.celebrityService.createCelebrity(celebrityDto);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async updateCelebrity(@Param('id') id: number, @Body() celebrityDto: CelebrityDto): Promise<Celebrity> {
    return await this.celebrityService.updateCelebrity(id, celebrityDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async deleteCelebrity(@Param('id') id: number): Promise<Celebrity> {
    return await this.celebrityService.deleteCelebrity(id);
  }
}
