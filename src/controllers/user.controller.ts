import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services/user.service.js';
import { User } from '../schemas/user.schema.js';
import { CreateUserDto } from '../dtos/user/create-user.dto.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body({}) body: CreateUserDto): Promise<User> {
    return await this.userService.createUser(body.sub);
  }
}
