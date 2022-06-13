import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { Classroom } from '@modules/courses/infra/typeorm/entities/Classroom';
import { IClassroomsRepository } from '@modules/courses/repositories/IClassroomsRepository';
import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest{
    fk_course: string;
    semester: number;
    year: number;
}

@injectable()
class UpdateClassroomUseCase {
  constructor(
        @inject('ClassroomsRepository') private classroomsRepository: IClassroomsRepository,
        @inject('CoursesRepository') private coursesRepository: ICoursesRepository,
  ) { }

  async execute(classroom_id: string, { fk_course, semester, year }: IRequest):
        Promise<Classroom> {
    const checkClassroomExists = await this.classroomsRepository.findById(classroom_id);
    const checkCourseExists = await this.coursesRepository.findById(fk_course);

    if (!checkClassroomExists) {
      throw new BuscaAtivaException('Classroom not found', 404);
    }

    if (!checkCourseExists) {
      throw new BuscaAtivaException('Course not found', 404);
    }

    const classroom = await this.classroomsRepository.update(classroom_id, {
      fk_course,
      semester,
      year,
    });

    return classroom;
  }
}
export { UpdateClassroomUseCase };
