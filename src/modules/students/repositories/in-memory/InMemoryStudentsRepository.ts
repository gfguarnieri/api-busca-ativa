import { ICreateStudentDTO } from '@modules/students/dtos/ICreateStudentDTO';
import { Student } from '@modules/students/infra/typeorm/entities/Student';

import { IStudentsRepository } from '../IStudentsRepository';

class InMemoryStudentsRepository implements IStudentsRepository {
  private studentsRepository: Student[] = [];

  async create({ cellphone, fk_classroom, name }: ICreateStudentDTO): Promise<Student> {
    const student = new Student();
    Object.assign(student, { cellphone, fk_classroom, name });
    this.studentsRepository.push(student);
    return student;
  }

  async delete(student_id: string): Promise<void> {
    const index = this.studentsRepository.findIndex((student) => student.id === student_id);
    this.studentsRepository.splice(index, 1);
  }

  async update(student_id: string, { cellphone, fk_classroom, name }:
        ICreateStudentDTO): Promise<Student> {
    const student = this.studentsRepository.find((student) => student.id === student_id);
    Object.assign(student, { cellphone, fk_classroom, name });
    return student;
  }

  async findById(student_id: string): Promise<Student> {
    const student = this.studentsRepository.find((student) => student.id === student_id);
    return student;
  }

  async filter(name?: string, fk_classroom?: string): Promise<Student[]> {
    const students = this.studentsRepository.filter((student) => {
      if (name && fk_classroom && student.name.startsWith(name)
            && student.fk_classroom === fk_classroom) {
        return true;
      } if (fk_classroom && student.fk_classroom === fk_classroom) {
        return true;
      }
      if (name && student.name.startsWith(name)) {
        return true;
      }
      return true;
    });
    return students;
  }
}

export { InMemoryStudentsRepository };
