import { DataSource } from 'typeorm';
import { Request } from './entities/request.entity';

export const carProviders = [
  {
    provide: 'REQUEST_PROVIDER',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Request),
    inject: ['DATA_SOURCE'],
  },
];
