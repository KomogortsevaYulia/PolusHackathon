import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import {
  Car,
  CarSubTypes,
  CarSubTypesValues,
  CarTypes,
} from '../../car/entities/car.entity';
import { WorkingShift } from '../../working-shift/entities/working-shift.entity';

export enum RequestStatuses {
  CREATED = 'Создана',
  APPOINTED = 'Назначена',
  PERFORMING = 'Выполняется',
  COMPLETED = 'Выполнена',
  CANCELLED = 'Отменена',
}

export enum RequestTypes {
  TRANSPORTATION = 'Перевозка',
  WORK = 'Работа на точке',
}

export enum RequestSubTypes {
  PASSENGER = 'Пассажирский',
  CARGO = 'Грузовой',
  TOWER = 'Автовышка',
  CRANE = 'Кран',
  LOADER = 'Погрузчик',
}

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RequestStatuses })
  status: RequestStatuses;

  @Column({ type: 'enum', enum: RequestTypes })
  type: RequestTypes;

  @Column({
    type: 'enum',
    enum: RequestSubTypes,
  })
  subType: RequestSubTypes;

  @Column()
  requiredCarName: string;

  @Column({ type: 'float' })
  startLon: number;

  @Column({ type: 'float' })
  startLat: number;

  @Column({ nullable: true, type: 'float' })
  endLat: number;

  @Column({ nullable: true, type: 'float' })
  endLon: number;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  firstPlace: string;

  @Column({ nullable: true })
  secondPlace: string;

  @Column()
  dateCreate: Date;

  @Column({ nullable: true })
  plannedDateStart: Date;

  @Column({ nullable: true })
  plannedDateEnd: Date;

  @Column({ nullable: true })
  factDateStart: Date;

  @Column({ nullable: true })
  factDateEnd: Date;

  @Column({ nullable: true })
  appointDate: Date;

  @ManyToOne(() => WorkingShift, (workingShift) => workingShift.requests)
  @JoinColumn()
  workingShift: WorkingShift;

  @ManyToOne(() => Car, (car) => car.requests)
  @JoinColumn()
  car: Car;

  @ManyToOne(() => User, (user) => user.requests)
  @JoinColumn()
  client: User;
}
