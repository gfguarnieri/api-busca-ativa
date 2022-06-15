import { IStudentsRepository } from '@modules/students/repositories/IStudentsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ImportListStudentsUseCase {
  constructor(@inject('StudentsRepository') private studentsRepository: IStudentsRepository) {}
  async execute(fk_classroom:string, studentsList: string[]) : Promise<void> {
    studentsList.forEach(async (student) => {
      await this.studentsRepository.create({
        cellphone: '',
        fk_classroom,
        name: student,
      });
    });
  }
}
export { ImportListStudentsUseCase };
