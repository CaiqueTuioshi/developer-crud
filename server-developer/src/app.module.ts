import { Module } from '@nestjs/common';
import { DeveloperModule } from './developer/developer.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [
    DeveloperModule,
    DatabaseModule
  ],
})
export class AppModule {}
