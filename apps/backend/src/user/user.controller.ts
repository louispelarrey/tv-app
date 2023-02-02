import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Get()
  // @UseGuards(JwtAuthGuard)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  async findOne(id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto.email, createUserDto.password);
  }

  @Put(':id')
  // @Roles(Role.Admin)
  async updateUser(@Body() updateUserDto: UpdateUserDto, id: number): Promise<User> {
    return await this.userService.updateUser(id, updateUserDto.email, updateUserDto.password);
  }

  @Delete(':id')
  // @Roles(Role.Admin)
  async deleteUser(id: number): Promise<User> {
    return await this.userService.deleteUser(id);
  }
}
