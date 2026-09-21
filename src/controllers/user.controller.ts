import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services/user.service.js';
import { User } from '../schemas/user.schema.js';
import { CreateUserDto } from '../dtos/user/create-user.dto.js';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un usuario',
    description: 'Registra un nuevo usuario y devuelve el documento creado.',
  })
  @ApiCreatedResponse({
    description: 'Usuario creado correctamente.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'El body es inválido.',
  })
  @ApiConflictResponse({
    description: 'Ya existe ese usuario.',
  })
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.userService.createUser(body);
  }
}
