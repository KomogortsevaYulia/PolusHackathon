import { DataSource } from 'typeorm';
import { WorkShift } from './entities/working-shift.entity';

export const workingShiftProviders = [
  {
    provide: 'WORKING_SHIFT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(WorkShift),
    inject: ['DATA_SOURCE'],
  },
];
