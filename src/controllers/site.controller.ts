import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SiteService } from '../services/site.service.js';
import { CreateSiteDto } from '../dtos/site/create-site.dto.js';
import mongoose from 'mongoose';

@Controller('sites')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Post()
  async createSite(@Body() body: CreateSiteDto) {
    return await this.siteService.createSite(body);
  }

  @Get('user')
  async getUserSites(@Query('userId') userId: string) {
    return await this.siteService.getUserSites(
      new mongoose.Types.ObjectId(userId),
    );
  }
}
