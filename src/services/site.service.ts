import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Site, SiteDocument } from '../schemas/site.schema.js';
import { CreateSiteDto } from '../dtos/site/create-site.dto.js';
import { UserService } from './user.service.js';

@Injectable()
export class SiteService {
  constructor(
    @InjectModel(Site.name) private siteModel: Model<SiteDocument>,
    private readonly userService: UserService,
  ) {}

  async createSite(data: CreateSiteDto) {
    return this.siteModel.create({
      ...data,
      userId: new mongoose.Types.ObjectId(data.userId),
    });
  }

  async getUserSites(userId: mongoose.Types.ObjectId) {
    if (!(await this.userService.existsUser(userId))) {
      throw new NotFoundException(`User ${userId.toString()} not found`);
    }
    return this.siteModel.find({ userId: userId });
  }

  async existsSite(siteId: mongoose.Types.ObjectId) {
    return (await this.siteModel.exists({ _id: siteId })) !== null;
  }
}
