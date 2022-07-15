import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindClassroomUseCase } from './FindClassroomUseCase';

class FindClassroomController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const findClassroomUseCase = container.resolve(FindClassroomUseCase);
    const classroom = await findClassroomUseCase.execute(id);
    return response.status(200).json(classroom);
  }
}

export { FindClassroomController };
