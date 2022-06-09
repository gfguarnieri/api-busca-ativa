import { ICreateStudentDTO } from '@modules/students/dtos/ICreateStudentDTO';
import { Student } from '@modules/students/infra/typeorm/entities/Student';

import { IStudentsRepository } from '../../../courses/repositories/IStudentsRepository';

class InMemoryStudentsRepository implements IStudentsRepository {
  private studentsRepository: Student[] = [];

  async create({ cellphone, fk_classroom, name }: ICreateStudentDTO): Promise<Student> {
    const student = new Student();
    Object.assign(student, { cellphone, fk_classroom, name });
    this.studentsRepository.push(student);
    return student;
  }
  delete(student_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(student_id: string, data: ICreateStudentDTO): Promise<Student> {
    throw new Error('Method not implemented.');
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

export { InMemoryStudentsRepository };
