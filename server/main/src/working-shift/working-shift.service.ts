import { Inject, Injectable } from '@nestjs/common';
import {
  IsNull,
  LessThan,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { WorkShift } from './entities/working-shift.entity';

export type filters = {
  dateStart?: Date;
  dateEnd?: Date;
  userId?: number;
  carId?: number;
};

@Injectable()
export class WorkingShiftService {
  constructor(
    @Inject('WORKING_SHIFT_REPOSITORY')
    private workingShiftRepo: Repository<WorkShift>,
  ) {}

  async startShift(userId: number, carId: number) {
    const shift = await this.workingShiftRepo.save({
      dateStart: new Date(),
      driver: {
        id: userId,
      },
      car: {
        id: carId,
      },
    });

    return await this.workingShiftRepo.find({
      where: { id: shift.id },
      relations: { driver: true, car: true },
    });
  }

  async endShift(userId: number) {
    const shift = await this.workingShiftRepo.findOne({
      where: { driver: { id: userId }, dateEnd: IsNull() },
      relations: {
        car: true,
        driver: true,
      },
    });

    return await this.workingShiftRepo.save({ ...shift, dateEnd: new Date() });
  }

  async getAll(filters?: filters) {
    return await this.workingShiftRepo.find({
      where: {
        driver: {
          id: filters.userId,
        },
        car: {
          id: filters.carId,
        },
        dateStart: MoreThanOrEqual(filters.dateStart),
      },
      relations: {
        car: true,
        driver: true,
      },
    });
  }
}
