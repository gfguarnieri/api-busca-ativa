import { Student } from '@modules/students/infra/typeorm/entities/Student';
import { IStudentsRepository } from '@modules/students/repositories/IStudentsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest{
    fk_classroom?: string;
    name?: string;
}

@injectable()
class FilterStudentsUseCase {
  constructor(@inject('StudentsRepository') private studentsRepository: IStudentsRepository) {}
  async execute({ fk_classroom, name }:IRequest): Promise<Student[]> {
    const students = await this.studentsRepository.filter(name, fk_classroom);
    return students;
  }
}
export { FilterStudentsUseCase };
