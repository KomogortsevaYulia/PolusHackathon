import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { WorkingShift } from '../../working-shift/entities/working-shift.entity';
import { Role } from './role.entity';
import { Request } from '../../request/entities/request.entity';

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

  @OneToMany(() => WorkingShift, (workingShift) => workingShift.driver)
  workingShifts: WorkingShift[];

  @OneToMany(() => Request, (request) => request.client)
  requests: Request[];
}
