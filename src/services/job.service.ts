import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Job, JobDocument, StateEnum } from '../schemas/job.schema.js';
import { SiteService } from './site.service.js';

@Injectable()
export class JobService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    private readonly siteService: SiteService,
  ) {}

  // posible eliminado
  async createJob(siteId: mongoose.Types.ObjectId) {
    if (!(await this.siteService.existsSite(siteId))) {
      throw new NotFoundException(`Site ${siteId.toString()} not found`);
    }
    return this.jobModel.create({
      siteId: siteId,
      finishedAt: undefined,
      state: StateEnum.IN_PROGRESS,
      numberPages: 56,
      amountDocuments: 60,
    });
  }

  async getUserJobs(userId: mongoose.Types.ObjectId) {
    const sites = await this.siteService.getUserSites(userId);
    const idSites = sites.map((s) => s._id);
    return this.jobModel
      .find({ siteId: { $in: idSites } })
      .populate('siteId', 'name');
  }

  async existsJob(jobId: mongoose.Types.ObjectId) {
    return (await this.jobModel.exists({ _id: jobId })) !== null;
  }
}
