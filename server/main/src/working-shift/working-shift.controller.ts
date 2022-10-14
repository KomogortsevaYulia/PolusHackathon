import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateShiftDto } from './dto/CreateShiftDto.dto';
import { WorkingShiftService } from './working-shift.service';

@Controller('working-shift')
export class WorkingShiftController {
  constructor(private wokringShiftService: WorkingShiftService) {}

  @Get()
  async getAll(
    @Query('userId') userId: number,
    @Query('carId') carId: number,
    @Query('dateStart') dateStart: Date,
  ) {
    return this.wokringShiftService.getAll({
      userId,
      carId,
      dateStart,
    });
  }

  @Post()
  async startShift(@Body() dto: CreateShiftDto) {
    return this.wokringShiftService.startShift(dto.userId, dto.carId);
  }

  @Patch(':userId')
  async endShift(@Param('userId') id: number) {
    return this.wokringShiftService.endShift(id);
  }
}
