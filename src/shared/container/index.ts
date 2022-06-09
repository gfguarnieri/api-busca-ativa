import { ClassroomsRepository } from '@modules/courses/infra/typeorm/repository/ClassroomsRepository';
import { CoursesRepository } from '@modules/courses/infra/typeorm/repository/CoursesRepository';
import { StudentsRepository } from '@modules/courses/infra/typeorm/repository/StudentsRepository';
import { IClassroomsRepository } from '@modules/courses/repositories/IClassroomsRepository';
import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';
import { IStudentsRepository } from '@modules/courses/repositories/IStudentsRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICoursesRepository>('CoursesRepository', CoursesRepository);
container.registerSingleton<IClassroomsRepository>('ClassroomsRepository', ClassroomsRepository);
container.registerSingleton<IStudentsRepository>('StudentsRepository', StudentsRepository);
