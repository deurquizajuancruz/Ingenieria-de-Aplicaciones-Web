import { IsMongoId, IsOptional } from 'class-validator';

export class GetUserJobsDto {
  @IsMongoId()
  userId: string;

  @IsOptional()
  @IsMongoId()
  siteId?: string;
}
