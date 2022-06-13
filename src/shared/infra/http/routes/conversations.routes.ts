import { CreateConversationController } from '@modules/students/useCases/createConversation/CreateConversationController';
import { DeleteConversationController } from '@modules/students/useCases/deleteConversation/DeleteConversationController';
import { FilterConversationsController } from '@modules/students/useCases/filterConversations/FilterConversationsController';
import { UpdateConversationController } from '@modules/students/useCases/updateConversation/UpdateConversationController';
import { Router } from 'express';

const conversationsRoutes = Router();

const createConversationController = new CreateConversationController();
const updateConversationController = new UpdateConversationController();
const deleteConversationController = new DeleteConversationController();
const filterConversationsController = new FilterConversationsController();

conversationsRoutes.post('/', createConversationController.handle);
conversationsRoutes.put('/:id', updateConversationController.handle);
conversationsRoutes.delete('/:id', deleteConversationController.handle);
conversationsRoutes.get('/', filterConversationsController.handle);

export { conversationsRoutes };
