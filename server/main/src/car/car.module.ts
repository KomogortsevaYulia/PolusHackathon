import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CarController } from './car.controller';
import { CarService } from './car.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
