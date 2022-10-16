import { Inject, Injectable } from '@nestjs/common';
import { WorkingShift } from 'src/working-shift/entities/working-shift.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/CreateRequestDto.dto';
import { Request, RequestStatuses } from './entities/request.entity';

@Injectable()
export class RequestService {
  constructor(
    @Inject('REQUEST_REPOSITORY')
    private requestRepo: Repository<Request>,
    @Inject('WORKING_SHIFT_REPOSITORY')
    private workingShiftRepo: Repository<WorkingShift>,
  ) {}

  async create(dto: CreateRequestDto) {
    // придумай блин как будут назначаться заявки

    const request = this.requestRepo.create({
      ...dto,
      dateCreate: new Date(),
      client: { id: dto.userId },
      status: RequestStatuses.CREATED,
    });

    return await this.requestRepo.save(request);
  }

  async appointCar(carId: number, requestId: number) {
    const shift = await this.workingShiftRepo.findOne({
      where: { car: { id: carId } },
    });

    await this.requestRepo.update(requestId, {
      // id: requestId,
      car: { id: carId },
      workingShift: { id: shift.id },
      appointDate: new Date(),
      status: RequestStatuses.APPOINTED,
    });

    return this.requestRepo.findOne({
      where: { id: requestId },
      relations: { car: true, client: true, workingShift: true },
    });
  }

  async startPerform(requestId: number) {
    await this.requestRepo.save({
      id: requestId,
      factDateStart: new Date(),
      status: RequestStatuses.PERFORMING,
    });

    return this.requestRepo.findOne({
      where: { id: requestId },
      relations: { car: true, client: true, workingShift: true },
    });
  }

  async endPerform(requestId: number) {
    await this.requestRepo.save({
      id: requestId,
      factDateEnd: new Date(),
      status: RequestStatuses.COMPLETED,
    });

    return this.requestRepo.findOne({
      where: { id: requestId },
      relations: { car: true, client: true, workingShift: true },
    });
  }

  async cancelRequest(requestId: number) {
    await this.requestRepo.save({
      id: requestId,
      factDateEnd: new Date(),
      status: RequestStatuses.CANCELLED,
    });
  }

  async getAllByClient(id: number) {
    return await this.requestRepo.find({
      where: {
        client: {
          id,
        },
      },
      relations: {
        car: true,
        client: true,
      },
    });
  }

  async getAllByCar(carId: number) {
    return this.requestRepo.find({
      where: {
        car: { id: carId },
      },
      relations: {
        car: true,
        client: true,
      },
    });
  }

  async getAllByDriver(driverId: number) {
    const shifts = await this.workingShiftRepo.find({
      where: { driver: { id: driverId } },
      relations: {
        requests: true,
      },
    });

    return shifts
      .map((s) => s.requests)
      .reduce((prev, cur) => prev.concat(cur), []);
  }

  async getAll() {
    return this.requestRepo.find({ relations: { car: true, client: true } });
  }
}
