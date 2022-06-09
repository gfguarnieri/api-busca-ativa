import { ClassroomsRepository } from '@modules/courses/infra/typeorm/repository/ClassroomsRepository';
import { CoursesRepository } from '@modules/courses/infra/typeorm/repository/CoursesRepository';
import { IClassroomsRepository } from '@modules/courses/repositories/IClassroomsRepository';
import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICoursesRepository>('CoursesRepository', CoursesRepository);
container.registerSingleton<IClassroomsRepository>('ClassroomsRepository', ClassroomsRepository);
