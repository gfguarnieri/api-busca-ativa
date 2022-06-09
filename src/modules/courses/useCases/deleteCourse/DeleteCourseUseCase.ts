import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteCourseUseCase {
  constructor(@inject('CoursesRepository') private coursesRepository: ICoursesRepository) {}
  async execute(course_id: string):Promise<void> {
    const course = await this.coursesRepository.findById(course_id);
    if (!course) {
      throw new BuscaAtivaException('Course not found', 404);
    }
    await this.coursesRepository.delete(course_id);
  }
}
export { DeleteCourseUseCase };
