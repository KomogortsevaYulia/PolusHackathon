import { Module } from '@nestjs/common';
import { workingShiftProviders } from 'src/working-shift/working-shift.provider';
import { DatabaseModule } from '../database/database.module';
import { RequestController } from './request.controller';
import { requestProviders } from './request.providers';
import { RequestService } from './request.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RequestController],
  providers: [RequestService, ...requestProviders, ...workingShiftProviders],
})
export class RequestModule {}
