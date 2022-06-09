import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateClassRoomUseCase } from './CreateClassroomUseCase';

class CreateClassroomController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { year, semester, fk_course } = request.body;
    const createClassroomUseCase = container.resolve(CreateClassRoomUseCase);
    const classroom = await createClassroomUseCase.execute({ year, semester, fk_course });
    return response.status(200).json(classroom);
  }
}
export { CreateClassroomController };
