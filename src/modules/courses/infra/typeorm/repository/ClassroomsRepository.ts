import { ICreateClassroomDTO } from '@modules/courses/dtos/ICreateClassroomDTO';
import { IClassroomsRepository } from '@modules/courses/repositories/IClassroomsRepository';
import { Repository } from 'typeorm';

import { dataSource } from '@shared/infra/typeorm';

import { Classroom } from '../entities/Classroom';

class ClassroomsRepository implements IClassroomsRepository {
  private repository: Repository<Classroom>;
  constructor() {
    this.repository = dataSource.getRepository(Classroom);
  }

  async create({ year, semester, fk_course }: ICreateClassroomDTO): Promise<Classroom> {
    const classroom = this.repository.create({ year, semester, fk_course });
    await this.repository.save(classroom);
    return classroom;
  }

  async update(
    classroom_id: string,
    { year, semester, fk_course }: ICreateClassroomDTO,
  ): Promise<Classroom> {
    const classroom = this.repository.create({
      id: classroom_id, year, semester, fk_course,
    });
    await this.repository.save(classroom);
    return classroom;
  }

  async delete(classroom_id: string): Promise<void> {
    await this.repository.delete({
      id: classroom_id,
    });
  }

  async getAll(): Promise<Classroom[]> {
    const classrooms = await this.repository.find();
    return classrooms;
  }

  async findById(classroom_id: string): Promise<Classroom> {
    const classroom = await this.repository.findOneBy({ id: classroom_id });
    return classroom;
  }
}

export { ClassroomsRepository };
