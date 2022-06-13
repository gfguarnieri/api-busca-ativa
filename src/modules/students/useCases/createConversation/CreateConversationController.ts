import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateConversationUseCase } from './CreateConversationUseCase';

class CreateConversationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { fk_student, description } = request.body;
    const { id } = request.user;
    const createConversationUseCase = container.resolve(CreateConversationUseCase);
    const conversation = await createConversationUseCase.execute(
      {
        fk_student,
        fk_admin: id,
        description,
      },
    );
    return response.status(200).json(conversation);
  }
}
export { CreateConversationController };
