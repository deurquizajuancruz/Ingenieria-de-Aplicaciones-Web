import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  PageDocument,
  PageDocumentDocument,
} from '../schemas/pageDocument.schema.js';
import { JobService } from './job.service.js';

@Injectable()
export class PageDocumentService {
  constructor(
    @InjectModel(PageDocument.name)
    private pageDocumentModel: Model<PageDocumentDocument>,
    private readonly jobService: JobService,
  ) {}

  async createDocument(jobId: mongoose.Types.ObjectId) {
    if (!(await this.jobService.existsJob(jobId))) {
      throw new NotFoundException(`Job ${jobId.toString()} not found`);
    }
    return this.pageDocumentModel.create({
      jobId: jobId,
      depthLevel: 2,
      route: '/cuspide/libros',
      data: {
        title: 'El Aleph',
        author: 'Jorge Luis Borges',
        price: 18500,
        description: 'Cuentos de Jorge Luis Borges publicados en 1949.',
      },
    });
  }

  async getPageDocumentsJob(jobId: mongoose.Types.ObjectId) {
    if (!(await this.jobService.existsJob(jobId))) {
      throw new NotFoundException(`Job ${jobId.toString()} not found`);
    }
    return this.pageDocumentModel.find({jobId: jobId});
  }
}
