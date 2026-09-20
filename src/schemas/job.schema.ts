import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Site } from './site.schema.js';

export type JobDocument = HydratedDocument<Job>;

export enum StateEnum {
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Schema({ timestamps: true })
export class Job {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    index: true,
  })
  siteId: mongoose.Types.ObjectId;

  @Prop()
  finishedAt: Date;

  @Prop({ required: true, enum: StateEnum, default: StateEnum.IN_PROGRESS })
  state: StateEnum;

  @Prop({ required: true, min: 0, default: 0 })
  numberPages: number;

  @Prop({ required: true, min: 0, default: 0 })
  amountDocuments: number;
}

export const JobSchema = SchemaFactory.createForClass(Job);
