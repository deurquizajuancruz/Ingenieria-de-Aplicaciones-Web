import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Job } from './job.schema.js';

export type PageDocumentDocument = HydratedDocument<PageDocument>;

@Schema()
export class PageDocument {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    index: true,
  })
  jobId: Job;

  @Prop({ required: true, min: 0 })
  depthLevel: number;

  @Prop({ required: true })
  route: string;

  @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
  data: Record<string, any>;
}

export const PageDocumentSchema = SchemaFactory.createForClass(PageDocument);
