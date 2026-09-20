import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Job, JobDocument } from '../schemas/job.schema.js';
import { SiteService } from './site.service.js';

@Injectable()
export class JobService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    private readonly siteService: SiteService,
  ) {}

  async createJob() {

  }

  async getUserJobs(userId: mongoose.Types.ObjectId) {
    const sites = await this.siteService.getUserSites(userId);
    const idSites = sites.map((s) => s._id);
    return this.jobModel
      .find({ siteId: { $in: idSites } })
      .populate('siteId', 'name');
  }
}
