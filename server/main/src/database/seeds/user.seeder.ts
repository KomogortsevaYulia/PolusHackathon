import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

import { User } from '../../user/entities/user.entity';
import { Role } from '../../user/entities/role.entity';

export default class GroupSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repositoryUser = dataSource.getRepository(User);
    const repositoryRole = dataSource.getRepository(Role);

    await repositoryRole.insert([
      {
        id: 1,
        name: 'CLIENT',
      },
      {
        id: 2,
        name: 'DISPATCHER',
      },
    ]);

    await repositoryUser.insert([
      {
        id: 1,
        name: 'Деловой Заказчик',
        login: 'customer',
        role: {
          id: 1,
        },
        password: 'qwerty',
      },
      {
        id: 2,
        name: 'Гигачад Диспетчер',
        login: 'dispatcher',
        role: {
          id: 2,
        },
        password: 'qwerty',
      },
    ]);
  }
}
