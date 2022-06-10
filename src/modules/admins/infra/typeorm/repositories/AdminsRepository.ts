import { IAdminsRepository } from '@modules/admins/repositories/IAdminsRepository';
import { Repository } from 'typeorm';

import { dataSource } from '@shared/infra/typeorm';

import { Admin } from '../entities/Admin';

class AdminsRepository implements IAdminsRepository {
  private repository: Repository<Admin>;

  constructor() {
    this.repository = dataSource.getRepository(Admin);
  }

  async findByEmail(email: string): Promise<Admin> {
    const admin = await this.repository.findOneBy({ email });
    return admin;
  }

  async findById(admin_id: string): Promise<Admin> {
    const admin = await this.repository.findOneBy({ id: admin_id });
    return admin;
  }
}

export { AdminsRepository };
