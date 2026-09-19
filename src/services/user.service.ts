import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema.js';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/user/create-user.dto.js';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(data: CreateUserDto) {
    return await this.userModel.create({ sub: data.sub });
  }
}
