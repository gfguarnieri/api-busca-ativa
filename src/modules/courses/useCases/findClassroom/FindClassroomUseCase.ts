import { Classroom } from '@modules/courses/infra/typeorm/entities/Classroom';
import { IClassroomsRepository } from '@modules/courses/repositories/IClassroomsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindClassroomUseCase {
  constructor(@inject('ClassroomsRepository') private classroomRepository: IClassroomsRepository) {}

  async execute(id: string): Promise<Classroom> {
    const classroom = await this.classroomRepository.findById(id);
    return classroom;
  }
}
export { FindClassroomUseCase };
