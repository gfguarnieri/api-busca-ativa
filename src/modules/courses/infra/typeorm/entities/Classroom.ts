import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Course } from './Course';

@Entity('classrooms')
class Classroom {
    @PrimaryColumn()
      id: string;
    @Column()
      year: number;
    @Column()
      semester: number;
    @ManyToOne(() => Course)
    @JoinColumn({ name: 'fk_course' })
      course: Course;
    @Column()
      fk_course: string;
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

export { Classroom };
