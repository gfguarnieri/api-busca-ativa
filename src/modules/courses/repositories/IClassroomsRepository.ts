import { ICreateClassroomDTO } from '../dtos/ICreateClassroomDTO';
import { Classroom } from '../infra/typeorm/entities/Classroom';

interface IClassroomsRepository{
    create(data: ICreateClassroomDTO):Promise<Classroom>
    delete(classroom_id:string):Promise<void>
    update(classroom_id:string, data: ICreateClassroomDTO):Promise<Classroom>
    findById(classroom_id:string):Promise<Classroom>
    getAll():Promise<Classroom[]>
}

export { IClassroomsRepository };
