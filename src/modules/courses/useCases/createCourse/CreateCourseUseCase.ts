import { Course } from '@modules/courses/infra/typeorm/entities/Course';
import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    name: string;
    coordinator: string;
    module_duration: string
}

@injectable()
class CreateCourseUseCase {
  constructor(@inject('CoursesRepository') private repository: ICoursesRepository) { }
  async execute({ name, coordinator, module_duration }: IRequest): Promise<Course> {
    const courseWithId = await this.repository.findByName(name);
    if (courseWithId) {
      throw new Error('This course already exists');
    }
    const course = await this.repository.create({ name, coordinator, module_duration });
    return course;
  }
}
export { CreateCourseUseCase };
