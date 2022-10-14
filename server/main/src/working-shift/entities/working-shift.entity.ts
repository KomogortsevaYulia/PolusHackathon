import { Car } from 'src/car/entities/car.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class WorkShift {
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
}
