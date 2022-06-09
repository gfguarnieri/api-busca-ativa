import {
  Column, CreateDateColumn, Entity, PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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
