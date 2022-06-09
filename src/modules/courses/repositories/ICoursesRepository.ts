import { ICreateCourseDTO } from '../dtos/ICreateCourseDTO';
import { Course } from '../infra/typeorm/entities/Course';

interface ICoursesRepository{
    create(data: ICreateCourseDTO): Promise<Course>
    update(course_id: string, data: ICreateCourseDTO): Promise<Course>
    getAll(): Promise<Course[]>
    findById(course_id: string): Promise<Course>
    findByName(name: string): Promise<Course>
    delete(course_id: string): Promise<void>
}
export { ICoursesRepository };
