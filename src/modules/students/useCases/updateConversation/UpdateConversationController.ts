import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateConversationUseCase } from './UpdateConversationUseCase';

class UpdateConversationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      description, fk_student, date,
    } = request.body;
    const fk_admin = request.user.id;
    const updateConversationUseCase = container.resolve(UpdateConversationUseCase);
    const conversation = await updateConversationUseCase.execute(id, {
      description, fk_admin, fk_student, date,
    });
    return response.status(200).json(conversation);
  }
}
export { UpdateConversationController };
