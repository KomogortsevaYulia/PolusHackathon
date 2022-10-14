import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { WorkingShiftController } from './working-shift.controller';
import { workingShiftProviders } from './working-shift.provider';
import { WorkingShiftService } from './working-shift.service';

@Module({
  imports: [DatabaseModule],
  controllers: [WorkingShiftController],
  providers: [WorkingShiftService, ...workingShiftProviders],
})
export class WorkingShiftModule {}
