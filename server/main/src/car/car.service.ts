import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
  Car,
  CarTypes,
  TransportationCarTypes,
  WorkCarTypes,
} from './entities/car.entity';

@Injectable()
export class CarService {
  constructor(
    @Inject('CAR_REPOSITORY')
    private carRepo: Repository<Car>,
  ) {}

  async getAll(
    type?: CarTypes,
    subType?: WorkCarTypes | TransportationCarTypes,
  ) {
    if (!type && !subType) {
      return this.carRepo.find();
    } else if (!subType) {
      return this.carRepo.find({
        where: {
          type,
        },
      });
    } else if (!type) {
      return this.carRepo.find({
        where: {
          subType: subType,
        },
      });
    }

    return this.carRepo.find({
      where: {
        type,
        subType,
      },
    });
  }

  async getById(id: number) {
    return this.carRepo.findOne({ where: { id } });
  }

  async breakCar(id: number) {
    const car = await this.carRepo.findOne({ where: { id } });

    return await this.carRepo.save({
      ...car,
      broken: true,
    });
  }

  async fixCar(id: number) {
    const car = await this.carRepo.findOne({ where: { id } });

    return await this.carRepo.save({
      ...car,
      broken: false,
    });
  }
}
