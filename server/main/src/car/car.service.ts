import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
  Car,
  CarSubTypes,
  CarTypes,
  TransportationCarTypes,
  WorkCarTypes,
} from './entities/car.entity';

export enum CarStatus {
  FREE = 'free',
  BUSY = 'busy',
  UNAVAILABLE = 'unavailable',
}

@Injectable()
export class CarService {
  constructor(
    @Inject('CAR_REPOSITORY')
    private carRepo: Repository<Car>,
  ) {}

  async getAll(type?: CarTypes, subType?: CarSubTypes) {
    if (!type && !subType) {
      return this.carRepo.find({
        relations: {
          workingShifts: true,
          requests: true,
        },
      });
    } else if (!subType) {
      return this.carRepo.find({
        where: {
          type,
        },
        relations: {
          workingShifts: true,
          requests: true,
        },
      });
    } else if (!type) {
      return this.carRepo.find({
        where: {
          subType: subType,
        },
        relations: {
          workingShifts: true,
          requests: true,
        },
      });
    }

    return this.carRepo.find({
      where: {
        type,
        subType,
      },
      relations: {
        workingShifts: true,
        requests: true,
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

  async getCarsWithStatuses(
    type?: CarTypes,
    subType?: CarSubTypes,
    name?: string,
    status?: CarStatus,
  ) {
    const cars = await this.getAll(type, subType);

    const carsCallback = (car: Car) => {
      if (
        car.broken ||
        car.workingShifts.every((shift) => shift.dateEnd !== null)
      ) {
        return {
          ...car,
          status: CarStatus.UNAVAILABLE,
        };
      }

      if (car.requests.some((r) => r.factDateEnd !== null)) {
        return {
          ...car,
          status: CarStatus.BUSY,
        };
      }

      return {
        ...car,
        status: CarStatus.FREE,
      };
    };

    const mappedCars = cars.map(carsCallback);

    const carsMap = new Map();

    mappedCars.forEach((c) => {
      if (!carsMap.has(c.name)) carsMap.set(c.name, [c]);
      else carsMap.get(c.name).push(c);
    });

    // return status ? mappedCars.filter((c) => c.status === status) : mappedCars;
    return name
      ? Object.fromEntries(carsMap)[name]
      : Object.fromEntries(carsMap);
  }
}
