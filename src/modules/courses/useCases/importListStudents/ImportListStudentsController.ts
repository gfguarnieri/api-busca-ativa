import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { Request, Response } from 'express';
import { promises } from 'fs';
import { container } from 'tsyringe';

import { ImportListStudentsUseCase } from './ImportListStudentsUseCase';

class ImportListStudentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const csv = request.file;
    if (!csv) {
      throw new BuscaAtivaException('File not found');
    }
    if (!(csv.mimetype === 'text/plain' || csv.mimetype === 'text/csv')) {
      throw new BuscaAtivaException('Type invalid');
    }
    const { id } = request.params;
    const data = await promises.readFile(csv.path, {
      encoding: 'utf8',
    });
    const students = data.replace(/\r/g, '').split('\n');
    const importListStudentsUseCase = container.resolve(ImportListStudentsUseCase);
    await importListStudentsUseCase.execute(id, students);
    return response.status(201).send();
  }
}
export { ImportListStudentsController };
