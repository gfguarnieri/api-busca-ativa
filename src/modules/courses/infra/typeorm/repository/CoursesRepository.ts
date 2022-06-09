import { ICreateCourseDTO } from '@modules/courses/dtos/ICreateCourseDTO';
import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';
import { Repository } from 'typeorm';

import { dataSource } from '@shared/infra/typeorm';

import { Course } from '../entities/Course';

class CoursesRepository implements ICoursesRepository {
  private repository: Repository<Course>;
  constructor() {
    this.repository = dataSource.getRepository(Course);
  }

  async create({ coordinator, module_duration, name }: ICreateCourseDTO): Promise<Course> {
    const course = this.repository.create({ coordinator, module_duration, name });
    await this.repository.save(course);
    return course;
  }

  async update(
    course_id: string,
    { coordinator, module_duration, name }: ICreateCourseDTO,
  ): Promise<Course> {
    const course = this.repository.create({
      id: course_id, coordinator, module_duration, name,
    });
    await this.repository.save(course);
    return course;
  }

  async delete(course_id: string): Promise<void> {
    await this.repository.delete({
      id: course_id,
    });
  }

  async getAll(): Promise<Course[]> {
    const courses = await this.repository.find();
    return courses;
  }

  async findById(course_id: string): Promise<Course> {
    const course = await this.repository.findOneBy({ id: course_id });
    return course;
  }

  async findByName(name: string): Promise<Course> {
    const course = await this.repository.findOneBy({ name });
    return course;
  }
}

export { CoursesRepository };
