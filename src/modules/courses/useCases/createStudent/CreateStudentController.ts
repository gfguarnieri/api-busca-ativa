import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateStudentUseCase } from './CreateStudentUseCase';

class CreateStudentController {
  async handle(request: Request, response:Response): Promise<Response> {
    const { name, cellphone, fk_classroom } = request.body;
    const createStudentUseCase = container.resolve(CreateStudentUseCase);
    const student = await createStudentUseCase.execute({ name, cellphone, fk_classroom });
    return response.status(201).json(student);
  }
}

export { CreateStudentController };
