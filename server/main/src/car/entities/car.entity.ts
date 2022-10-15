import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { WorkingShift } from '../../working-shift/entities/working-shift.entity';
import { Request } from '../../request/entities/request.entity';

export enum CarTypes {
  TRANSPORTATION = 'Перевозка',
  WORK = 'Работа на точке',
}

export enum TransportationCarTypes {
  PASSENGER = 'Пассажирский',
  CARGO = 'Грузовой',
}

export enum WorkCarTypes {
  TOWER = 'Автовышка',
  CRANE = 'Кран',
  LOADER = 'Погрузчик',
}

export enum CarSubTypes {
  PASSENGER = 'Пассажирский',
  CARGO = 'Грузовой',
  TOWER = 'Автовышка',
  CRANE = 'Кран',
  LOADER = 'Погрузчик',
}

export type CarSubTypesValues = typeof CarSubTypes[keyof typeof CarSubTypes];

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  number: string;

  @Column({ default: false })
  broken: boolean;

  @Column({ type: 'enum', enum: CarTypes })
  type: CarTypes;

  @Column({ type: 'enum', enum: CarSubTypes })
  subType: CarSubTypes;

  @OneToMany(() => WorkingShift, (workingShift) => workingShift.car)
  workingShifts: WorkingShift[];

  @OneToMany(() => Request, (request) => request.car)
  requests: Request[];
}
