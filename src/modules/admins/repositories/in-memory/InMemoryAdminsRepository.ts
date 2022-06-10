import { ICreateAdminDTO } from '@modules/admins/dtos/ICreateAdminDTO';
import { Admin } from '@modules/admins/infra/typeorm/entities/Admin';

import { IAdminsRepository } from '../IAdminsRepository';

class InMemoryAdminsRepository implements IAdminsRepository {
  private adminsRepository: Admin[] = [];

  async create({ email, name, password }:ICreateAdminDTO):Promise<Admin> {
    const admin = new Admin();
    Object.assign(admin, { email, name, password });
    this.adminsRepository.push(admin);
    return admin;
  }

  async findByEmail(email: string): Promise<Admin> {
    const admin = this.adminsRepository.find((admin) => admin.email === email);
    return admin;
  }

  async findById(admin_id: string): Promise<Admin> {
    const admin = this.adminsRepository.find((admin) => admin.id === admin_id);
    return admin;
  }
}

export { InMemoryAdminsRepository };
