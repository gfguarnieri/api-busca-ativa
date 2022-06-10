import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { AdminsRepository } from '@modules/admins/infra/typeorm/repositories/AdminsRepository';
import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

config();

interface IPayLoad{
    id: string;
}

function checkAdminUser(id: string) {
  const adminsRepository = new AdminsRepository();
  const admin = adminsRepository.findById(id);
  if (!admin) {
    throw new BuscaAtivaException('Invalid ID', 500);
  }
}

export function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const auth = request.headers.authorization;
  try {
    const [, token] = auth.split(' ');
    const { id } = verify(token, process.env.SECRET_KEY) as IPayLoad;
    checkAdminUser(id);
    request.user = { id };
  } catch {
    throw new BuscaAtivaException('Invalid token', 500);
  }
  next();
}
