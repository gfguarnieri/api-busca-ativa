import { Admin } from '../infra/typeorm/entities/Admin';

interface IAdminsRepository{
    findByEmail(email:string): Promise<Admin>;
    findById(admin_id: string): Promise<Admin>;
}
export { IAdminsRepository };
