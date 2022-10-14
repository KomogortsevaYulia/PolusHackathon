import { Controller, Get, Param, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { ParkTypes } from './entities/car.entity';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  async getAll(@Query('type') type: ParkTypes) {
    return this.carService.getAll(type);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.carService.getById(id);
  }
}
