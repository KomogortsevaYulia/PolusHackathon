import { Car } from '../../car/entities/car.entity';
import { User } from '../../user/entities/user.entity';
import { Request } from '../../request/entities/request.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class WorkingShift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateStart: Date;

  @Column({ nullable: true })
  dateEnd: Date;

  @ManyToOne(() => User, (user) => user.workingShifts)
  driver: User;

  @ManyToOne(() => Car, (car) => car.workingShifts)
  car: Car;

  @OneToMany(() => Request, (request) => request.workingShift)
  requests: Request[];
}
