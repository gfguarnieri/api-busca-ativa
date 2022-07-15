import { Course } from '@modules/courses/infra/typeorm/entities/Course';
import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindCourseUseCase {
  constructor(@inject('CoursesRepository') private coursesRepository: ICoursesRepository) {}
  async execute(id: string):Promise<Course> {
    const course = await this.coursesRepository.findById(id);
    return course;
  }
}
export { FindCourseUseCase };
