import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { ShowDto } from './dto/show.dto';
import { Show } from './show.entity';
import { ShowService } from './show.service';

@Controller('show')
export class ShowController {
  constructor(
    private readonly showService: ShowService,
  ) {}

  @Get()
  async findAll(): Promise<Show[]> {
    return await this.showService.findAll();
  }

  @Get('/followed')
  async findAllFollowed(@Request() req): Promise<Show[]> {
    return await this.showService.findAllFollowed(req.user.sub);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Show> {
    return await this.showService.findById(id);
  }

  @Post()
  async createShow(@Body() showDto: ShowDto): Promise<Show> {
    return await this.showService.create(showDto);
  }

  @Put(':id')
  async updateShow(@Param('id') id: number, @Body() showDto: ShowDto): Promise<Show> {
    return await this.showService.update(id, showDto);
  }

  @Delete(':id')
  async deleteShow(@Param('id') id: number): Promise<Show> {
    return await this.showService.delete(id);
  }

  @Get('/follow/:id')
  async followShow(@Param('id') id: number, @Request() req): Promise<any> {
    return {"add": await this.showService.follow(id, req.user.id), "message": "Show followed"};
  }
}
