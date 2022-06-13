import { Admin } from '@modules/admins/infra/typeorm/entities/Admin';
import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Student } from './Student';

@Entity('conversations')
class Conversation {
    @PrimaryColumn()
      id: string;
    @ManyToOne(() => Student)
    @JoinColumn({ name: 'fk_student' })
      student: Student;
    @ManyToOne(() => Admin)
    @JoinColumn({ name: 'fk_admin' })
      admin: Admin;
    @Column()
      fk_student: string;
    @Column()
      fk_admin: string;
    @CreateDateColumn()
      date: Date;
    @Column()
      description: string;
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

export { Conversation };
