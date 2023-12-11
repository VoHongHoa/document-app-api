import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { AdminGuard, JwtGuard } from 'src/auth/guards';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(AdminGuard)
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.createUser(dto);
  }

  @UseGuards(AdminGuard)
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  async updateUser(@Param('id') userId: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(userId, user);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  async getUserById(@Param('id') userId: string) {
    return this.userService.getUserById(userId);
  }
}
