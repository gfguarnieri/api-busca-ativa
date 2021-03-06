import { ICreateStudentDTO } from '../dtos/ICreateStudentDTO';
import { Student } from '../infra/typeorm/entities/Student';

interface IStudentsRepository {
  create(data: ICreateStudentDTO):Promise<Student>
  delete(student_id:string):Promise<void>
  update(student_id:string, data: ICreateStudentDTO):Promise<Student>
  findById(student_id:string):Promise<Student>
  filter(name?: string, fk_classroom?: string):Promise<Student[]>
}

export { IStudentsRepository };
