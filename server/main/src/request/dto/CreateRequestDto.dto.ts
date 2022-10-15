import { CarSubTypesValues, CarTypes } from 'src/car/entities/car.entity';

export class CreateRequestDto {
  type: CarTypes;
  subType: CarSubTypesValues;
  startLon: number;
  startLat: number;
  endLon?: number;
  endLat?: number;
  plannedDateStart: Date;
  plannedDateEnd?: Date;
  userId: number;
}
