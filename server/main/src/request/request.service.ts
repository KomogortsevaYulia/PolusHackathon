import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/CreateRequestDto.dto';
import { Request } from './entities/request.entity';

@Injectable()
export class RequestService {
  constructor(
    @Inject('REQUEST_REPOSITORY')
    private requestRepo: Repository<Request>,
  ) {}

  async create(dto: CreateRequestDto) {
    // придумай блин как будут назначаться заявки

    const request = this.requestRepo.create({
      ...dto,
      user: { id: dto.userId },
    });

    return await this.requestRepo.save(request);
  }

  async appointCar(carId: number, requestId: number) {
    await this.requestRepo.save({ car: { id: carId }, id: requestId });

    return this.requestRepo.findOne({
      where: { id: requestId },
      relations: { car: true, user: true },
    });
  }
}
