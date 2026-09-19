import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Site, SiteDocument } from '../schemas/site.schema.js';
import { CreateSiteDto } from '../dtos/site/create-site.dto.js';

@Injectable()
export class SiteService {
  constructor(@InjectModel(Site.name) private siteModel: Model<SiteDocument>) {}

  async createSite(data: CreateSiteDto) {
    return this.siteModel.create({
      ...data,
      userId: new mongoose.Types.ObjectId(data.userId),
    });
  }

  async getUserSites(userId: mongoose.Types.ObjectId) {
    return this.siteModel.find({ userId: userId });
  }
}
