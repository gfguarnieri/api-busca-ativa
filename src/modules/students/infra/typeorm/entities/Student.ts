import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Classroom } from '../../../../courses/infra/typeorm/entities/Classroom';
import { Conversation } from './Conversation';

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
    @OneToMany(() => Conversation, (conversation) => conversation.student)
      conversations: Conversation[];
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
