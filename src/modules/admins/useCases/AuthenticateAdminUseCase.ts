import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { compareSync } from 'bcryptjs';
import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IAdminsRepository } from '../repositories/IAdminsRepository';

config();

interface IResponse {
    token: string;
    email: string;
    name: string
}

@injectable()
class AuthenticateAdminUseCase {
  constructor(@inject('AdminsRepository') private adminsRepository: IAdminsRepository) { }
  async execute(email: string, password: string): Promise<IResponse> {
    const admin = await this.adminsRepository.findByEmail(email);
    if (!admin) {
      throw new BuscaAtivaException('Invalid password/email', 401);
    }
    const checkPassword = compareSync(password, admin.password);
    if (!checkPassword) {
      throw new BuscaAtivaException('Invalid password/email', 401);
    }
    const token = sign({ id: admin.id }, process.env.SECRET_KEY, { expiresIn: '7d' });
    return { token, name: admin.name, email: admin.email };
  }
}

export { AuthenticateAdminUseCase };
