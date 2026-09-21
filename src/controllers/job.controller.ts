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
import { GetUserJobsDto } from '../dtos/job/get-user-jobs.dto.js';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get('')
  @ApiOperation({
    summary: 'Listar los jobs de un usuario',
    description:
      'Devuelve los jobs disparados sobre los sitios del usuario dado. ' +
      'Si se envía siteId, se acotan a ese sitio; el sitio debe pertenecer al usuario.',
  })
  @ApiQuery({
    name: 'userId',
    type: String,
    required: true,
    description: 'ObjectId del usuario dueño de los sitios.',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiQuery({
    name: 'siteId',
    type: String,
    required: false,
    description:
      'ObjectId de un sitio del usuario. Si se omite, se devuelven los jobs de todos sus sitios.',
    example: '507f1f77bcf86cd799439012',
  })
  @ApiOkResponse({
    description:
      'Listado de jobs. Array vacío si el usuario no tiene sitios o no hay jobs.',
  })
  @ApiBadRequestResponse({
    description: 'userId o siteId no son ObjectId válidos.',
  })
  @ApiNotFoundResponse({
    description: 'El usuario no existe, o el sitio no pertenece al usuario.',
  })
  async getUserJobs(@Query() data: GetUserJobsDto) {
    const transformer = new TransformObjectId();
    const userId = transformer.transform(data.userId);
    const siteId = data.siteId ? transformer.transform(data.siteId) : undefined;
    return await this.jobService.getUserJobs(userId, siteId);
  }

  @Get(':jobId')
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
