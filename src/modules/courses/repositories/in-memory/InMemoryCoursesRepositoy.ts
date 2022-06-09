import { ICreateCourseDTO } from '@modules/courses/dtos/ICreateCourseDTO';
import { Course } from '@modules/courses/infra/typeorm/entities/Course';

import { ICoursesRepository } from '../ICoursesRepository';

class InMemoryCoursesRepository implements ICoursesRepository {
  private repository: Course[] = [];

  async create({ coordinator, name, module_duration }: ICreateCourseDTO): Promise<Course> {
    const course = new Course();
    Object.assign(course, { coordinator, name, module_duration });
    this.repository.push(course);
    return course;
  }

  async update(course_id: string, data: ICreateCourseDTO): Promise<Course> {
    const course = this.repository.find((course) => course.id === course_id);
    Object.assign(course, data);
    return course;
  }

  async getAll(): Promise<Course[]> {
    return this.repository;
  }

  async findById(course_id: string): Promise<Course> {
    const course = this.repository.find((course) => course.id === course_id);
    return course;
  }

  async findByName(name: string): Promise<Course> {
    const course = this.repository.find((course) => course.name === name);
    return course;
  }

  async delete(course_id: string): Promise<void> {
    const index = this.repository.findIndex((course) => course.id === course_id);
    this.repository.splice(index, 1);
  }
}
export { InMemoryCoursesRepository };
