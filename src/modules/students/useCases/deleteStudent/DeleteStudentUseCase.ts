import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { IStudentsRepository } from '@modules/students/repositories/IStudentsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteStudentUseCase {
  constructor(@inject('StudentsRepository') private studentsRepository: IStudentsRepository) {}
  async execute(student_id: string): Promise<void> {
    const student = await this.studentsRepository.findById(student_id);
    if (!student) {
      throw new BuscaAtivaException('Student not found', 404);
    }
    await this.studentsRepository.delete(student_id);
  }
}

export { DeleteStudentUseCase };
