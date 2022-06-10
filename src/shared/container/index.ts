import { AdminsRepository } from '@modules/admins/infra/typeorm/repositories/AdminsRepository';
import { IAdminsRepository } from '@modules/admins/repositories/IAdminsRepository';
import { ClassroomsRepository } from '@modules/courses/infra/typeorm/repository/ClassroomsRepository';
import { CoursesRepository } from '@modules/courses/infra/typeorm/repository/CoursesRepository';
import { IClassroomsRepository } from '@modules/courses/repositories/IClassroomsRepository';
import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';
import { StudentsRepository } from '@modules/students/infra/typeorm/repository/StudentsRepository';
import { IStudentsRepository } from '@modules/students/repositories/IStudentsRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICoursesRepository>('CoursesRepository', CoursesRepository);
container.registerSingleton<IClassroomsRepository>('ClassroomsRepository', ClassroomsRepository);
container.registerSingleton<IStudentsRepository>('StudentsRepository', StudentsRepository);
container.registerSingleton<IAdminsRepository>('AdminsRepository', AdminsRepository);
