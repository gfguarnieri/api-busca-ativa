import { ICreateStudentDTO } from '@modules/courses/dtos/ICreateStudentDTO';
import { IStudentsRepository } from '@modules/courses/repositories/IStudentsRepository';
import { Repository } from 'typeorm';

import { dataSource } from '@shared/infra/typeorm';

import { Student } from '../entities/Student';

class StudentsRepository implements IStudentsRepository {
  private repository: Repository<Student>;
  constructor() {
    this.repository = dataSource.getRepository(Student);
  }

  async create({ cellphone, fk_classroom, name }: ICreateStudentDTO): Promise<Student> {
    const student = this.repository.create({ cellphone, fk_classroom, name });
    await this.repository.save(student);
    return student;
  }

  async delete(student_id: string): Promise<void> {
    await this.repository.delete({ id: student_id });
  }

  async update(student_id: string, { cellphone, fk_classroom, name }: ICreateStudentDTO):
    Promise<Student> {
    const student = this.repository.create({
      id: student_id, cellphone, fk_classroom, name,
    });
    await this.repository.save(student);
    return student;
  }

  findById(student_id: string): Promise<Student> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<Student[]> {
    throw new Error('Method not implemented.');
  }
  listByClassroomId(): Promise<Student[]> {
    throw new Error('Method not implemented.');
  }
}

export { StudentsRepository };
