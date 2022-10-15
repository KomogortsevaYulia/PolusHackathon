import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppointCarDto } from './dto/AppointCarDto.dto';
import { CreateRequestDto } from './dto/CreateRequestDto.dto';
import { RequestService } from './request.service';

@Controller('request')
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Post()
  async create(@Body() dto: CreateRequestDto) {
    return this.requestService.create(dto);
  }

  @Get('/byCar/:carId')
  async getAllByCar(@Param('carId') carId: number) {
    return this.requestService.getAllByCar(carId);
  }

  @Get('/byClient/:clientId')
  async getAllByClient(@Param('clientId') clientId: number) {
    return this.requestService.getAllByClient(clientId);
  }

  @Patch('/appoint/:requestId')
  async appoint(
    @Param('requestId') requestId: number,
    @Body() dto: AppointCarDto,
  ) {
    return this.requestService.appointCar(dto.carId, requestId);
  }
}
