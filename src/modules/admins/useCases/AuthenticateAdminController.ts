import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateAdminUseCase } from './AuthenticateAdminUseCase';

class AuthenticateAdminController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateAdminUseCase = container.resolve(AuthenticateAdminUseCase);
    const admin = await authenticateAdminUseCase.execute(email, password);
    return response.status(200).json(admin);
  }
}

export { AuthenticateAdminController };
