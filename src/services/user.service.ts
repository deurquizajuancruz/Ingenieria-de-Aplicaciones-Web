import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema.js';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/user/create-user.dto.js';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(sub: string) {
    if (await this.existsUserSub(sub)) {
      throw new ConflictException('User already exists');
    }
    return await this.userModel.create({ sub: sub });
  }

  async existsUser(userId: mongoose.Types.ObjectId) {
    return (await this.userModel.exists({ _id: userId })) !== null;
  }

  async existsUserSub(sub: string) {
    return (await this.userModel.exists({ sub: sub })) !== null;
  }
}
