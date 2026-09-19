import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema.js';
import { Site, SiteSchema } from './schemas/site.schema.js';
import {
  PageDocument,
  PageDocumentSchema,
} from './schemas/pageDocument.schema.js';
import { Job, JobSchema } from './schemas/job.schema.js';
import { UserService } from './services/user.service.js';
import { UserController } from './controllers/user.controller.js';
import { SiteController } from './controllers/site.controller.js';
import { SiteService } from './services/site.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Site.name, schema: SiteSchema },
      { name: PageDocument.name, schema: PageDocumentSchema },
      { name: Job.name, schema: JobSchema },
    ]),
  ],
  controllers: [UserController, SiteController],
  providers: [UserService, SiteService],
})
export class AppModule {}
