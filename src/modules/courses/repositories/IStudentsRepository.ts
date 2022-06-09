import { ICreateStudentDTO } from '../../students/dtos/ICreateStudentDTO';
import { Student } from '../../students/infra/typeorm/entities/Student';

interface IStudentsRepository {
  create(data: ICreateStudentDTO):Promise<Student>
  delete(student_id:string):Promise<void>
  update(student_id:string, data: ICreateStudentDTO):Promise<Student>
  findById(student_id:string):Promise<Student>
  getAll():Promise<Student[]>
  listByClassroomId():Promise<Student[]>
}

export { IStudentsRepository };
