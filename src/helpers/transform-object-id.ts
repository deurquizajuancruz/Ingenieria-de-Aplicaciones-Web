import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class TransformObjectId implements PipeTransform<
  string,
  mongoose.Types.ObjectId
> {
  transform(value: string): mongoose.Types.ObjectId {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`'${value}' is not a valid ObjectId`);
    }
    return new mongoose.Types.ObjectId(value);
  }
}
