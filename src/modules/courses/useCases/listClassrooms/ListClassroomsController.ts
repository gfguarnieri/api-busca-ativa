import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListClassroomsUseCase } from './ListClassroomsUseCase';

class ListClassroomsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listClassroomsUseCase = container.resolve(ListClassroomsUseCase);
    const classrooms = await listClassroomsUseCase.execute();
    return response.status(200).json(classrooms);
  }
}

export { ListClassroomsController };
