import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FilterConversationsUseCase } from './FilterConversationsUseCase';

class FilterConversationsController {
  async handle(request: Request, response: Response):Promise<Response> {
    const { start, end, fk_student } = request.query;
    const filterConversationUseCase = container.resolve(FilterConversationsUseCase);
    const conversations = await filterConversationUseCase.execute({
      start: start !== undefined ? new Date(start as string) : undefined,
      end: end !== undefined ? new Date(end as string) : undefined,
      fk_student: fk_student !== undefined ? fk_student as string : undefined,
    });
    return response.status(200).json(conversations);
  }
}
export { FilterConversationsController };
