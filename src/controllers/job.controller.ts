import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import mongoose from 'mongoose';
import { JobService } from '../services/job.service.js';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { TransformObjectId } from '../helpers/transform-object-id.js';
import { GetUserJobsDto } from '../dtos/job/get-user-jobs.dto.js';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get('')
  @ApiOperation({
    summary: 'Listar los jobs de un usuario',
    description:
      'Devuelve todos los jobs disparados sobre los sitios del usuario dado.',
  })
  @ApiQuery({
    name: 'userId',
    description: 'ObjectId del usuario dueño de los sitios.',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiQuery({
    name: 'siteId',
    required: false,
    description: 'ObjectId del sitio al cual pertenecen los jobs.'
  })
  @ApiOkResponse({ description: 'Listado de jobs del usuario.' })
  @ApiBadRequestResponse({ description: 'El userId no es un ObjectId válido.' })
  async getUserJobs(@Query() data: GetUserJobsDto) {
    const transformer = new TransformObjectId();
    const userId = transformer.transform(data.userId);
    const siteId = data.siteId ? transformer.transform(data.siteId) : undefined;
    return await this.jobService.getUserJobs(userId, siteId);
  }

  // eliminar
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      required: ['siteId'],
      properties: {
        siteId: { type: 'string', example: '507f1f77bcf86cd799439011' },
      },
    },
  })
  @ApiOperation({
    summary: '[Temporal] Crear un job con datos hardcodeados',
    description:
      'Endpoint de demo: inserta un job en progreso sobre el sitio indicado, con contadores fijos. No forma parte de la aplicación final.',
  })
  @ApiCreatedResponse({ description: 'Job creado correctamente.' })
  @ApiBadRequestResponse({ description: 'El siteId no es un ObjectId válido.' })
  @ApiNotFoundResponse({ description: 'No existe un sitio con ese id.' })
  async createJob(
    @Body('siteId', TransformObjectId) siteId: mongoose.Types.ObjectId,
  ) {
    return await this.jobService.createJob(siteId);
  }
}
