import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { resolve } from 'path';
import { readFile } from 'fs/promises';

import { Car } from '../../car/entities/car.entity';

// import * as data from '../../../data.json';

export default class GroupSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repositoryCar = dataSource.getRepository(Car);

    const carsCount = await repositoryCar.count();

    if (carsCount === 0) {
      const data = await readFile(
        resolve(__dirname, '..', '..', '..', 'data.json'),
      );

      const cars = JSON.parse(data.toString());

      await repositoryCar.insert(
        cars.map((car) => ({
          id: +faker.phone.number('#######'),
          name: car['Наименование ТС'],
          number: car['Номер ТС'],
          description: car['описание характеристики'],
          type: car['Парк техники'],
        })),
      );
    }
  }
}
