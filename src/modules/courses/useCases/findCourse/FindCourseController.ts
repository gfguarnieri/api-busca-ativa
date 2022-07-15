import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindCourseUseCase } from './FindCourseUseCase';

class FindCourseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const findCourseUseCase = container.resolve(FindCourseUseCase);
    const course = await findCourseUseCase.execute(id);
    return response.status(200).json(course);
  }
}

export { FindCourseController };
