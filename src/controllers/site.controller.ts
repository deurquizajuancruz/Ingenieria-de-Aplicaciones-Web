import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SiteService } from '../services/site.service.js';
import { CreateSiteDto } from '../dtos/site/create-site.dto.js';
import mongoose from 'mongoose';
import { TransformObjectId } from '../helpers/transform-object-id.js';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@Controller('sites')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Get('')
  @ApiOperation({
    summary: 'Listar los sitios de un usuario',
    description: 'Devuelve todos los sitios registrados por el usuario dado.',
  })
  @ApiQuery({
    name: 'userId',
    type: String,
    description: 'ObjectId del usuario dueño de los sitios.',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiOkResponse({ description: 'Listado de sitios del usuario.' })
  @ApiBadRequestResponse({ description: 'El userId no es un ObjectId válido.' })
  @ApiNotFoundResponse({ description: 'No existe un usuario con ese id.' })
  async getUserSites(
    @Query('userId', TransformObjectId) userId: mongoose.Types.ObjectId,
  ) {
    return await this.siteService.getUserSites(userId);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un sitio',
    description:
      'Registra un sitio con su profundidad, frecuencia y extractor.',
  })
  @ApiCreatedResponse({ description: 'Sitio creado correctamente.' })
  @ApiBadRequestResponse({
    description: 'El body es inválido.',
  })
  async createSite(@Body() body: CreateSiteDto) {
    return await this.siteService.createSite(body);
  }

  @Patch(':siteId/change-status')
  @ApiOperation({
    summary: 'Cambiar estado de sitio',
    description:
      'Cambia el estado de un sitio. Si está activo, pasa a estar inactivo. Si está inactivo, pasa a estar activo.',
  })
  @ApiParam({
    name: 'siteId',
    type: String,
    description: 'SiteId del sitio.',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiNotFoundResponse({ description: 'El sitio no existe.' })
  @ApiOkResponse({
    description: 'El estado del sitio fue cambiado correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'El siteId es inválido.',
  })
  async changeSiteStatus(
    @Param('siteId', TransformObjectId) siteId: mongoose.Types.ObjectId,
  ) {
    return await this.siteService.changeSiteStatus(siteId);
  }
}
