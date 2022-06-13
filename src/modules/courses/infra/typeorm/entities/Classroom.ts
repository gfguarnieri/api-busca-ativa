import { Student } from '@modules/students/infra/typeorm/entities/Student';
import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn,
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
    // @ManyToOne(() => Course)
    // @JoinColumn({ name: 'fk_course' })
    //   course: Course;

    @Column()
      fk_course: string;
    @CreateDateColumn()
      created_at: Date;
    @CreateDateColumn()
      updated_at: Date;

    @OneToMany(() => Student, (student) => student.classroom)
      students: Student[];

    constructor() {
      if (!this.id) {
        this.id = uuidv4();
      }
    }
}

export { Classroom };
