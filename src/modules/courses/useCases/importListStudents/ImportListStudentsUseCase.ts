import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { IClassroomsRepository } from '@modules/courses/repositories/IClassroomsRepository';
import { IStudentsRepository } from '@modules/students/repositories/IStudentsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ImportListStudentsUseCase {
  constructor(
@inject('StudentsRepository') private studentsRepository: IStudentsRepository,

  @inject('ClassroomsRepository') private classroomsRepository: IClassroomsRepository,
  ) {}
  async execute(fk_classroom:string, studentsList: string[]) : Promise<void> {
    const classroom = await this.classroomsRepository.findById(fk_classroom);

    if (!classroom) {
      throw new BuscaAtivaException('Invalid classroom');
    }

    studentsList.forEach(async (student) => {
      if (student.trim()) {
        await this.studentsRepository.create({
          cellphone: '',
          fk_classroom,
          name: student,
        });
      }
    });
  }
}
export { ImportListStudentsUseCase };
