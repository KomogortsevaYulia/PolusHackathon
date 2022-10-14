import { DataSource } from 'typeorm';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Role),
    inject: ['DATA_SOURCE'],
  },
];
