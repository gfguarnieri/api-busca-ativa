import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateCourseUseCase } from './UpdateCourseUseCase';

class UpdateCourseController {
  async handle(request: Request, response: Response):Promise<Response> {
    const { id } = request.params;
    const { name, coordinator, module_duration } = request.body;
    const updateCourseUseCase = container.resolve(UpdateCourseUseCase);
    const course = await updateCourseUseCase.execute(id, { name, coordinator, module_duration });
    return response.status(200).json(course);
  }
}

export { UpdateCourseController };
