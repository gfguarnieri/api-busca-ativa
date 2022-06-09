import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateStudentUseCase } from './UpdateStudentUseCase';

class UpdateStudentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { fk_classroom, name, cellphone } = request.body;
    const updateStudentUseCase = container.resolve(UpdateStudentUseCase);
    const student = await updateStudentUseCase.execute(id, { fk_classroom, name, cellphone });
    return response.status(200).json(student);
  }
}

export { UpdateStudentController };
