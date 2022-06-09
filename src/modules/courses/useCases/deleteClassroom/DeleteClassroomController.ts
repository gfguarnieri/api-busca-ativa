import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteClassroomUseCase } from './DeleteClassroomUseCase';

class DeleteClassroomController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteClassroomUseCase = container.resolve(DeleteClassroomUseCase);
    await deleteClassroomUseCase.execute(id);
    return response.status(204).send();
  }
}
export { DeleteClassroomController };
