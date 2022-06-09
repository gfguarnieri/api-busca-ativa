import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Classroom } from './Classroom';

@Entity('students')
class Student {
    @PrimaryColumn()
      id: string;
    @Column()
      name: string;
    @Column()
      cellphone: string;
    @ManyToOne(() => Classroom)
    @JoinColumn({ name: 'fk_classroom' })
      classroom: Classroom;
    @Column()
      fk_classroom: string;
    @CreateDateColumn()
      created_at: Date;
    @CreateDateColumn()
      updated_at: Date;
    constructor() {
      if (!this.id) {
        this.id = uuidv4();
      }
    }
}

export { Student };
