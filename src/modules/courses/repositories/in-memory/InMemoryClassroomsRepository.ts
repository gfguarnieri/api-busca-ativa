import { ICreateClassroomDTO } from '@modules/courses/dtos/ICreateClassroomDTO';
import { Classroom } from '@modules/courses/infra/typeorm/entities/Classroom';

import { IClassroomsRepository } from '../IClassroomsRepository';

class InMemoryClassroomsRepository implements IClassroomsRepository {
  private classRoomsRepository: Classroom[] = [];

  async create({ fk_course, semester, year }: ICreateClassroomDTO): Promise<Classroom> {
    const classroom = new Classroom();
    Object.assign(classroom, { fk_course, semester, year });
    this.classRoomsRepository.push(classroom);
    return classroom;
  }

  async delete(classroom_id: string): Promise<void> {
    const index = this.classRoomsRepository.findIndex((classroom) => classroom.id === classroom_id);
    this.classRoomsRepository.splice(index, 1);
  }

  async update(classroom_id: string, { fk_course, semester, year }:
    ICreateClassroomDTO): Promise<Classroom> {
    const classroom = this.classRoomsRepository.find((classroom) => classroom.id === classroom_id);
    Object.assign(classroom, { fk_course, semester, year });
    return classroom;
  }

  async findById(classroom_id: string): Promise<Classroom> {
    const classroom = this.classRoomsRepository.find((classroom) => classroom.id === classroom_id);
    return classroom;
  }

  async getAll(): Promise<Classroom[]> {
    return this.classRoomsRepository;
  }
}
export { InMemoryClassroomsRepository };
