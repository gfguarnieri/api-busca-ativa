import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { AdminsRepository } from '@modules/admins/infra/typeorm/repositories/AdminsRepository';
import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

config();

interface IPayLoad{
    id: string;
}

export function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const auth = request.headers.authorization;
  if (!auth) {
    throw new BuscaAtivaException('A token is necessary.', 500);
  }
  const [, token] = auth.split(' ');
  try {
    const { id } = verify(token, process.env.SECRET_KEY) as IPayLoad;
    const adminsRepository = new AdminsRepository();
    const admin = adminsRepository.findById(id);
    if (!admin) {
      throw new BuscaAtivaException('Invalid ID', 500);
    }
    request.user = { id };
    next();
  } catch {
    throw new BuscaAtivaException('Token invalid', 500);
  }
}
