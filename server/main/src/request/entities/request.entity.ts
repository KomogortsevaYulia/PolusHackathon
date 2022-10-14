import { CarTypes } from 'src/car/entities/car.entity';
import { WorkingShift } from 'src/working-shift/entities/working-shift.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

export enum RequestStatuses {
  CREATED = 'Создана',
  APPOINTED = 'Назначена',
  NOT_APPOINTED = 'Не назначена',
  COMPLETED = 'Выполнена',
}

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RequestStatuses })
  status: RequestStatuses;

  @Column({ type: 'enum', enum: CarTypes })
  type: CarTypes;

  @Column()
  startLon: number;

  @Column()
  startLat: number;

  @Column({ nullable: true })
  endLat: number;

  @Column({ nullable: true })
  endLon: number;

  @ManyToOne(() => WorkingShift, (workingShift) => workingShift.requests)
  workingShift: WorkingShift;
}
