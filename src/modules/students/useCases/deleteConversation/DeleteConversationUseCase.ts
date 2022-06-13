import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { IConversationsRepository } from '@modules/students/repositories/IConversationsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteConversationUseCase {
  constructor(@inject('ConversationsRepository') private conversationRepositoy: IConversationsRepository) {}
  async execute(conversation_id: string):Promise<void> {
    const checkConversation = await this.conversationRepositoy.findById(conversation_id);
    if (!checkConversation) {
      throw new BuscaAtivaException('Conversation not found', 404);
    }
    await this.conversationRepositoy.delete(conversation_id);
  }
}
export { DeleteConversationUseCase };
