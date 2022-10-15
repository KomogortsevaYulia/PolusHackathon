import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RequestController } from './request.controller';
import { requestProviders } from './request.providers';
import { RequestService } from './request.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RequestController],
  providers: [RequestService, ...requestProviders],
})
export class RequestModule {}
