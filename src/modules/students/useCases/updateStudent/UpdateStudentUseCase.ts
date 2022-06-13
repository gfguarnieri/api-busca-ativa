import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { IClassroomsRepository } from '@modules/courses/repositories/IClassroomsRepository';
import { Student } from '@modules/students/infra/typeorm/entities/Student';
import { IStudentsRepository } from '@modules/students/repositories/IStudentsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest{
    student_id: string;
    cellphone: string;
    fk_classroom: string;
    name: string;
}

@injectable()
class UpdateStudentUseCase {
  constructor(
    @inject('StudentsRepository') private studentsRepository: IStudentsRepository,
    @inject('ClassroomsRepository') private classroomsRepository: IClassroomsRepository,
  ) { }
  async execute({
    cellphone, fk_classroom, name, student_id,
  }:IRequest):Promise<Student> {
    const checkStudent = await this.studentsRepository.findById(student_id);
    if (!checkStudent) {
      throw new BuscaAtivaException('Student not found');
    }
    const checkClassroom = await this.classroomsRepository.findById(fk_classroom);
    if (!checkClassroom) {
      throw new BuscaAtivaException('Classroom not found');
    }
    const student = await this.studentsRepository.update(student_id, {
      cellphone,
      fk_classroom,
      name,
    });
    return student;
  }
}

export { UpdateStudentUseCase };
