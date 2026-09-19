import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema.js';

export type SiteDocument = HydratedDocument<Site>;

@Schema({ timestamps: true })
export class Site {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true, max: 5, min: 1 })
  depth: number;

  @Prop({ required: true, min: 1 })
  frequencyHours: number;

  @Prop({ required: true })
  extractor: string;

  @Prop({ required: false })
  resolver?: string;

  @Prop({ default: true })
  active: boolean;
}

export const SiteSchema = SchemaFactory.createForClass(Site);
