import { WorkShift } from 'src/working-shift/entities/working-shift.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn()
  role: Role;

  @OneToMany(() => WorkShift, (workingShift) => workingShift.driver)
  workingShifts: WorkShift[];
}
