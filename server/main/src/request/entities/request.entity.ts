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
  NOT_APPOINTED = 'Не назначена',
  COMPLETED = 'Выполнена',
}

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RequestStatuses, enumName: 'RequestStatuses' })
  status: RequestStatuses;

  // @Column({ type: 'enum', enum: CarTypes, enumName: 'RequestTypes' })
  // type: CarTypes;

  @Column({
    type: 'enum',
    enum: CarSubTypes,
    enumName: 'RequestSub',
    nullable: false,
  })
  subType: CarSubTypesValues;

  @Column()
  startLon: number;

  @Column()
  startLat: number;

  @Column({ nullable: true })
  endLat: number;

  @Column({ nullable: true })
  endLon: number;

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
  user: User;
}
