import { Controller, Get } from '@nestjs/common';

@Controller('tv-maze')
export class TvMazeController {

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

}
