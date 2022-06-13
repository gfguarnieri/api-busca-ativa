import {
  Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Classroom } from './Classroom';

@Entity('courses')
class Course {
  @PrimaryColumn()
    id: string;
  @Column()
    name: string;
  @Column()
    coordinator: string;
  @Column()
    module_duration: string;
  @OneToMany(() => Classroom, (classroom) => classroom.course)
    classrooms: Classroom[];
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

export { Course };
