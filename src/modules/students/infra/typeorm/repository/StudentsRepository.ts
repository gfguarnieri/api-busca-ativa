import { ICreateStudentDTO } from '@modules/students/dtos/ICreateStudentDTO';
import { IStudentsRepository } from '@modules/students/repositories/IStudentsRepository';
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

  async findById(student_id: string): Promise<Student> {
    const student = await this.repository.findOneBy({ id: student_id });
    return student;
  }

  async filter(name?: string, fk_classroom?: string): Promise<Student[]> {
    const query = await this.repository.createQueryBuilder('student').select('*');
    if (name) {
      query.andWhere('name ILIKE :name', { name: `%${name}%` });
    }
    if (fk_classroom) {
      query.andWhere('fk_classroom = :fk_classroom', { fk_classroom });
    }
    const students = query.execute();
    return students;
  }
}

export { StudentsRepository };
