import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Car, ParkTypes } from './entities/car.entity';

@Injectable()
export class CarService {
  constructor(
    @Inject('CAR_REPOSITORY')
    private carRepo: Repository<Car>,
  ) {}

  async getAll(type?: ParkTypes) {
    return type
      ? this.carRepo.find({
          where: {
            type,
          },
        })
      : this.carRepo.find();
  }

  async getById(id: number) {
    return this.carRepo.findOne({ where: { id } });
  }
}
