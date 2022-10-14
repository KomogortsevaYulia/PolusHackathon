import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

import { User } from '../user/entities/user.entity';
import { Role } from '../user/entities/role.entity';
import { Car } from '../car/entities/car.entity';
import { WorkingShift } from '../working-shift/entities/working-shift.entity';
import { Request } from '../request/entities/request.entity';

require('dotenv').config();

(async () => {
  const options: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'polus',
    entities: [User, Role, Car, WorkingShift, Request],
    synchronize: true,
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
    factories: ['src/database/factories/**/*{.ts,.js}'],
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  await runSeeders(dataSource);
})();
