import 'reflect-metadata';
import '../typeorm';
import '../../container';
import 'express-async-errors';
import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import express, { NextFunction, Request, Response } from 'express';

import { router } from './routes';

const app = express();
app.use(express.json());

app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof BuscaAtivaException) {
    return response.status(err.code)
      .json({ error: err.message });
  }
  return response.status(500).json({ error: `Internal server error - ${err.message}` });
});

export { app };
