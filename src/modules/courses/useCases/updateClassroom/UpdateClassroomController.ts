import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateClassroomUseCase } from './UpdateClassroomUseCase';

class UpdateClassroomController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { semester, year, fk_course } = request.body;
    const updateClassRoomController = container.resolve(UpdateClassroomUseCase);
    const classroom = await updateClassRoomController.execute(id, { semester, year, fk_course });
    return response.status(200).json(classroom);
  }
}
export { UpdateClassroomController };
