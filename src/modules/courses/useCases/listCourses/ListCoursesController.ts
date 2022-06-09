import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCourseUseCase } from './ListCoursesUseCase';

class ListCoursesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCoursesUseCase = container.resolve(ListCourseUseCase);
    const courses = await listCoursesUseCase.execute();
    return response.status(200).json(courses);
  }
}
export { ListCoursesController };
