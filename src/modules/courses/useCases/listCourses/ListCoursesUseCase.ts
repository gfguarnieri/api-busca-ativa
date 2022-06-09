import { Course } from '@modules/courses/infra/typeorm/entities/Course';
import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListCourseUseCase {
  constructor(@inject('CoursesRepository') private coursesRepository: ICoursesRepository) {}
  async execute():Promise<Course[]> {
    const courses = await this.coursesRepository.getAll();
    return courses;
  }
}

export { ListCourseUseCase };
