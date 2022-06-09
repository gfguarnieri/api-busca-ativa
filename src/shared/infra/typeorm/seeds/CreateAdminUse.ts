import { Admin } from '@modules/admins/infra/typeorm/entities/Admin';
import { hash } from 'bcryptjs';

import 'reflect-metadata';
import { dataSource } from '../index';

async function createAdminUser(): Promise<void> {
  await dataSource.initialize();
  const repository = dataSource.getRepository(Admin);
  const admin = repository.create({
    email: 'gfguarnieri@hotmail.com',
    name: 'Giovanni Guarnieri',
    password: await hash('123456', 5),
  });
  await repository.save(admin);
}

createAdminUser();
