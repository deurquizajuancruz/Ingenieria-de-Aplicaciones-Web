import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import mongoose from 'mongoose';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { PageDocumentService } from '../services/pageDocument.service.js';
import { TransformObjectId } from '../helpers/transform-object-id.js';

@Controller('pageDocuments')
export class PageDocumentController {
  constructor(private readonly pageDocumentService: PageDocumentService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar los documents de un job',
    description:
      'Devuelve los documentos extraídos durante la corrida indicada.',
  })
  @ApiQuery({
    name: 'jobId',
    description: 'ObjectId del job cuyos documentos se quieren listar.',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiOkResponse({ description: 'Listado de documentos del job.' })
  @ApiBadRequestResponse({ description: 'El jobId no es un ObjectId válido.' })
  @ApiNotFoundResponse({ description: 'No existe un job con ese id.' })
  async getPageDocumentsJob(
    @Query('jobId', TransformObjectId) jobId: mongoose.Types.ObjectId,
  ) {
    return await this.pageDocumentService.getPageDocumentsJob(jobId);
  }

  // eliminar
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      required: ['jobId'],
      properties: {
        jobId: { type: 'string', example: '507f1f77bcf86cd799439011' },
      },
    },
  })
  @ApiOperation({
    summary: '[Temporal] Crear un documento con datos hardcodeados',
    description:
      'Endpoint de demo: inserta un documento fijo asociado al job indicado. No forma parte de la aplicación final.',
  })
  @ApiCreatedResponse({ description: 'Documento creado correctamente.' })
  @ApiBadRequestResponse({ description: 'El jobId no es un ObjectId válido.' })
  @ApiNotFoundResponse({ description: 'No existe un job con ese id.' })
  async createPageDocument(
    @Body('jobId', TransformObjectId) jobId: mongoose.Types.ObjectId,
  ) {
    return await this.pageDocumentService.createDocument(jobId);
  }
}
