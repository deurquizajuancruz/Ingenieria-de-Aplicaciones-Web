import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import mongoose from 'mongoose';
import { JobService } from '../services/job.service.js';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { TransformObjectId } from '../helpers/transform-object-id.js';

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
    type: String,
    description: 'ObjectId del usuario dueño de los sitios.',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiOkResponse({ description: 'Listado de jobs del usuario.' })
  @ApiBadRequestResponse({ description: 'El userId no es un ObjectId válido.' })
  @ApiNotFoundResponse({ description: 'El user no existe' })
  async getUserJobs(
    @Query('userId', TransformObjectId) userId: mongoose.Types.ObjectId,
  ) {
    return await this.jobService.getUserJobs(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un job por id' })
  @ApiParam({
    name: 'jobId',
    type: String,
    description: 'ObjectId del job.',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiOkResponse({ description: 'El job solicitado.' })
  @ApiBadRequestResponse({ description: 'El id no es un ObjectId válido.' })
  @ApiNotFoundResponse({ description: 'No existe un job con ese id.' })
  async getJob(
    @Param('jobId', TransformObjectId) jobId: mongoose.Types.ObjectId,
  ) {
    return await this.jobService.getJob(jobId);
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
