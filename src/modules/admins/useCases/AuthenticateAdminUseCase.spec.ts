import { BuscaAtivaException } from '@errors/BuscaAtivaException';

import { InMemoryAdminsRepository } from '../repositories/in-memory/InMemoryAdminsRepository';
import { AuthenticateAdminUseCase } from './AuthenticateAdminUseCase';

let adminsRepository: InMemoryAdminsRepository;
let authenticateAdminUseCase: AuthenticateAdminUseCase;

describe('Authenticate Admin Use Case', () => {
  beforeEach(() => {
    adminsRepository = new InMemoryAdminsRepository();
    authenticateAdminUseCase = new AuthenticateAdminUseCase(adminsRepository);
  });

  it('Should be able to authenticate a admin user', async () => {
    await adminsRepository.create({
      email: 'gfguarnieri@hotmail.com',
      name: 'Giovanni Guarnieri',
      password: '$2a$05$pfH8KCSPfsdY.2solryov.aRwFWdIHYVPgkXdHaTDAaPU8HqmOW3u',
    });
    const response = await authenticateAdminUseCase.execute('gfguarnieri@hotmail.com', '123456');
    expect(response).toHaveProperty('token');
  });

  it('Should not be able  to authenticate a admin user with invalid email', async () => {
    expect(async () => {
      await adminsRepository.create({
        email: 'gfguarnieri@hotmail.com',
        name: 'Giovanni Guarnieri',
        password: '$2a$05$pfH8KCSPfsdY.2solryov.aRwFWdIHYVPgkXdHaTDAaPU8HqmOW3u',
      });
      await authenticateAdminUseCase.execute('test@hotmail.com', '123456');
    }).rejects.toBeInstanceOf(BuscaAtivaException);
  });

  it('Should not be able  to authenticate a admin user with invalid password', async () => {
    expect(async () => {
      await adminsRepository.create({
        email: 'test@hotmail.com',
        name: 'Giovanni Guarnieri',
        password: '$2a$05$pfH8KCSPfsdY.2solryov.aRwFWdIHYVPgkXdHaTDAaPU8HqmOW3u',
      });
      await authenticateAdminUseCase.execute('test@hotmail.com', '543210invalid');
    }).rejects.toBeInstanceOf(BuscaAtivaException);
  });
});
