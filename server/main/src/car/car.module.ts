import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { CarController } from './car.controller';
import { carProviders } from './car.providers';
import { CarService } from './car.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CarController],
  providers: [CarService, ...carProviders],
})
export class CarModule {}
