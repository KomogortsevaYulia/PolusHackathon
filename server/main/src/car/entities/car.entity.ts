import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export enum ParkTypes {
  TOWER = 'Парк автовышек',
  CRANE = 'Парк кранов',
  loader = 'Парк погрузчиков',
}

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

  @Column({ type: 'enum', enum: ParkTypes })
  type: ParkTypes;
}
