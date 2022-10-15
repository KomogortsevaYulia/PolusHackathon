import { CarSubTypesValues, CarTypes } from 'src/car/entities/car.entity';
import { RequestTypes, RequestSubTypes } from '../entities/request.entity';

export class CreateRequestDto {
  type: RequestTypes;
  subType: RequestSubTypes;
  requiredCarName: string;
  startLon: number;
  startLat: number;
  endLon?: number;
  endLat?: number;
  plannedDateStart: Date;
  plannedDateEnd?: Date;
  userId: number;
}
