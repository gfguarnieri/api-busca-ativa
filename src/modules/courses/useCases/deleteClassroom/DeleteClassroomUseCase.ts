import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { IClassroomsRepository } from '@modules/courses/repositories/IClassroomsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteClassroomUseCase {
  constructor(@inject('ClassroomsRepository') private classroomRepository: IClassroomsRepository) {}
  async execute(classroom_id: string): Promise<void> {
    const classroom = await this.classroomRepository.findById(classroom_id);
    if (!classroom) {
      throw new BuscaAtivaException('Classroom not found', 404);
    }
    await this.classroomRepository.delete(classroom_id);
  }
}

export { DeleteClassroomUseCase };
