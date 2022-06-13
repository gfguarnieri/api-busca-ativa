import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteConversationUseCase } from './DeleteConversationUseCase';

class DeleteConversationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteConversationUseCase = container.resolve(DeleteConversationUseCase);
    await deleteConversationUseCase.execute(id);
    return response.status(201).send();
  }
}

export { DeleteConversationController };
