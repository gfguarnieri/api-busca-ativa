import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteStudentUseCase } from './DeleteStudentUseCase';

class DeleteStudentController {
  async handle(request: Request, response: Response):Promise<Response> {
    const { id } = request.params;
    const deleteStudentUseCase = container.resolve(DeleteStudentUseCase);
    await deleteStudentUseCase.execute(id);
    return response.status(204).send();
  }
}

export { DeleteStudentController };
