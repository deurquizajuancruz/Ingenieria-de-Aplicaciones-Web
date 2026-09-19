import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateSiteDto {
  // reemplazar
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  depth: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  frequencyHours: number;

  @IsNotEmpty()
  @IsString()
  extractor: string;

  @IsOptional()
  resolver?: string;
}
