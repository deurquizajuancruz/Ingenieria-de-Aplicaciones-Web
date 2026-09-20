import { Controller, Get, Post, Query } from '@nestjs/common';
import mongoose from 'mongoose';
import { JobService } from '../services/job.service.js';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get('')
  async getUserJobs(@Query('userId') userId: string) {
    return await this.jobService.getUserJobs(
      new mongoose.Types.ObjectId(userId),
    );
  }

  @Post()
  async createJob() {

  }
}
