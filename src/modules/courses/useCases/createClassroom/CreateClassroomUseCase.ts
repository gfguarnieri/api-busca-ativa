import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { Classroom } from '@modules/courses/infra/typeorm/entities/Classroom';
import { IClassroomsRepository } from '@modules/courses/repositories/IClassroomsRepository';
import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest{
    year: number;
    semester: number;
    fk_course: string
}

@injectable()
class CreateClassRoomUseCase {
  constructor(
    @inject('ClassroomsRepository') private classroomsRepository: IClassroomsRepository,
    @inject('CoursesRepository') private coursesRepository: ICoursesRepository,
  ) {}
  async execute({ year, semester, fk_course }: IRequest): Promise<Classroom> {
    const course = await this.coursesRepository.findById(fk_course);
    if (!course) {
      throw new BuscaAtivaException('Course not found!');
    }
    const classroom = await this.classroomsRepository.create({ year, semester, fk_course });
    return classroom;
  }
}
export { CreateClassRoomUseCase };
