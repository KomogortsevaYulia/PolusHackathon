import { Body, Controller, Post } from '@nestjs/common';
import { CreateRequestDto } from './dto/CreateRequestDto.dto';
import { RequestService } from './request.service';

@Controller('request')
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Post()
  async create(@Body() dto: CreateRequestDto) {
    return this.requestService.create(dto);
  }
}
