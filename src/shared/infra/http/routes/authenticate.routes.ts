import { AuthenticateAdminController } from '@modules/admins/useCases/AuthenticateAdminController';
import { Router } from 'express';

const authenticateRoutes = Router();
const authenticateAdminController = new AuthenticateAdminController();

authenticateRoutes.post('/', authenticateAdminController.handle);

export { authenticateRoutes };
