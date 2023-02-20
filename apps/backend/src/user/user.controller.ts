import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
  async findOne(@Param() id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto.username, createUserDto.email, createUserDto.password);
  }

  @Put(':id')
  // @Roles(Role.Admin)
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Param() id: number): Promise<User> {
    return await this.userService.updateUser(id, updateUserDto.username, updateUserDto.email, updateUserDto.password);
  }

  // @Roles(Role.Admin)
  @Delete(':id')
  async deleteUser(@Param() id: number): Promise<User> {
    return await this.userService.deleteUser(id);
  }
}
