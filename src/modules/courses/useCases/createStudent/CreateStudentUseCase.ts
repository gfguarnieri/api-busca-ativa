import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { Student } from '@modules/courses/infra/typeorm/entities/Student';
import { IClassroomsRepository } from '@modules/courses/repositories/IClassroomsRepository';
import { IStudentsRepository } from '@modules/courses/repositories/IStudentsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    name: string;
    cellphone: string;
    fk_classroom: string
}

@injectable()
class CreateStudentUseCase {
  constructor(
        @inject('StudentsRepository') private studentsRepository: IStudentsRepository,
        @inject('ClassroomsRepository') private classroomsRepository: IClassroomsRepository,
  ) { }

  async execute({ name, cellphone, fk_classroom }: IRequest): Promise<Student> {
    const classroom = await this.classroomsRepository.findById(fk_classroom);
    if (!classroom) {
      throw new BuscaAtivaException('Classroom not found');
    }
    const student = await this.studentsRepository.create({ name, cellphone, fk_classroom });
    return student;
  }
}

export { CreateStudentUseCase };
