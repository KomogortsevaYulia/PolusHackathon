import { Controller, Get, Param, Query } from '@nestjs/common';
import { CarService } from './car.service';
import {
  CarTypes,
  TransportationCarTypes,
  WorkCarTypes,
} from './entities/car.entity';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  async getAll(
    @Query('type') type: CarTypes,
    @Query('sub_type') subType: WorkCarTypes | TransportationCarTypes,
  ) {
    return this.carService.getAll(type, subType);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.carService.getById(id);
  }
}
