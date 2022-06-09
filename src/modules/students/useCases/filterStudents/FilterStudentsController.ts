import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FilterStudentsUseCase } from './FilterStudentsUseCase';

class FilterStudentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { fk_classroom, name } = request.query;
    const filterStudentsUseCase = container.resolve(FilterStudentsUseCase);
    const students = await filterStudentsUseCase.execute({
      fk_classroom: fk_classroom as string,
      name: name as string,
    });
    return response.status(200).json(students);
  }
}
export { FilterStudentsController };
