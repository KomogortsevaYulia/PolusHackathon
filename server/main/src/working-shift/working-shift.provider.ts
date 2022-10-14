import { DataSource } from 'typeorm';
import { WorkingShift } from './entities/working-shift.entity';

export const workingShiftProviders = [
  {
    provide: 'WORKING_SHIFT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(WorkingShift),
    inject: ['DATA_SOURCE'],
  },
];
