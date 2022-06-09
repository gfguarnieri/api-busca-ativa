import { Classroom } from '@modules/courses/infra/typeorm/entities/Classroom';
import { IClassroomsRepository } from '@modules/courses/repositories/IClassroomsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListClassroomsUseCase {
  constructor(@inject('ClassroomsRepository') private classroomsRepository: IClassroomsRepository) { }

  async execute(): Promise<Classroom[]> {
    const classrooms = await this.classroomsRepository.getAll();
    return classrooms;
  }
}
export { ListClassroomsUseCase };
