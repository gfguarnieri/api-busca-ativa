import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCourseUseCase } from './CreateCourseUseCase';

class CreateCourseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, coordinator, module_duration } = request.body;
    const createCourseUseCase = container.resolve(CreateCourseUseCase);
    const course = await createCourseUseCase.execute({ name, coordinator, module_duration });
    return response.status(200).json(course);
  }
}

export { CreateCourseController };
