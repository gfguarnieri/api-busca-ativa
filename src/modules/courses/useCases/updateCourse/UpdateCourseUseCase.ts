import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { Course } from '@modules/courses/infra/typeorm/entities/Course';
import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest{
    name: string;
    coordinator: string;
    module_duration: string
}

@injectable()
class UpdateCourseUseCase {
  constructor(@inject('CoursesRepository') private coursesRepository: ICoursesRepository) {}
  async execute(course_id: string, { name, coordinator, module_duration }:IRequest):
  Promise<Course> {
    const checkID = await this.coursesRepository.findById(course_id);
    if (!checkID) throw new BuscaAtivaException('Course not found');
    const course = await this.coursesRepository.update(course_id, {
      name,
      coordinator,
      module_duration,
    });
    return course;
  }
}

export { UpdateCourseUseCase };
