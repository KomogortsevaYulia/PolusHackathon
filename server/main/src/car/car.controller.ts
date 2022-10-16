import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { CarService, CarStatus } from './car.service';
import {
  CarSubTypes,
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
    @Query('sub_type') subType: CarSubTypes,
    @Query('name') name: string,
    @Query('status') status: CarStatus,
  ) {
    return this.carService.getCarsWithStatuses(type, subType, name, status);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.carService.getById(id);
  }

  @Patch('/break/:id')
  async breakCar(@Param('id') id: number) {
    return this.carService.breakCar(id);
  }

  @Patch('/fix/:id')
  async fixCar(@Param('id') id: number) {
    return this.carService.fixCar(id);
  }
}
