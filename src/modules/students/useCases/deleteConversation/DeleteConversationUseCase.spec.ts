import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { InMemoryConversationsRepository } from '@modules/students/repositories/in-memory/InMemoryConversationsRepository';

import { DeleteConversationUseCase } from './DeleteConversationUseCase';

let inMemoryConversationsRepository: InMemoryConversationsRepository;
let deleteConversationUseCase: DeleteConversationUseCase;
describe('Delete Conversation Use Case', () => {
  beforeEach(() => {
    inMemoryConversationsRepository = new InMemoryConversationsRepository();
    deleteConversationUseCase = new DeleteConversationUseCase(inMemoryConversationsRepository);
  });

  it('Should be able to delete a conversation', async () => {
    const conversation = await inMemoryConversationsRepository.create({
      description: 'description test',
      fk_admin: '1234',
      fk_student: '1234',
      date: new Date(),
    });
    await deleteConversationUseCase.execute(conversation.id);
    const list = await inMemoryConversationsRepository.filter({});
    expect(list).toHaveLength(0);
  });

  it('Should not be able to delete a conversation with invalid id', async () => {
    expect(async () => {
      await deleteConversationUseCase.execute('invalid');
    }).rejects.toBeInstanceOf(BuscaAtivaException);
  });
});
