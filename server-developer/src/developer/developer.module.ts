import { Module } from '@nestjs/common';
import { DeveloperController } from './controller/developer.controller';
import { DeveloperService } from './service/developer.service';
import { Developer, DeveloperSchema } from './schema/developer.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Developer.name, schema: DeveloperSchema },
    ]),
  ],
  controllers: [DeveloperController],
  providers: [DeveloperService],
})
export class DeveloperModule {}
