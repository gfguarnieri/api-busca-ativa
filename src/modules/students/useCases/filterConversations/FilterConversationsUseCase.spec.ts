import { InMemoryConversationsRepository } from '@modules/students/repositories/in-memory/InMemoryConversationsRepository';

import { FilterConversationsUseCase } from './FilterConversationsUseCase';

let conversationsRepository: InMemoryConversationsRepository;
let filterConversationsUseCase: FilterConversationsUseCase;
describe('Filter Conversations Use Case', () => {
  beforeEach(() => {
    conversationsRepository = new InMemoryConversationsRepository();
    filterConversationsUseCase = new FilterConversationsUseCase(conversationsRepository);
  });

  it('Should be able to filter conversations by student', async () => {
    conversationsRepository.create({
      description: 'test',
      fk_admin: '123',
      fk_student: '1',
      date: new Date(),
    });
    const conversationFound = await filterConversationsUseCase.execute({ fk_student: '1' });
    expect(conversationFound).toHaveLength(1);
  });

  it('Should be able to filter conversations by date', async () => {
    conversationsRepository.create({
      description: 'test',
      fk_admin: '123',
      fk_student: '1',
      date: new Date(2022, 0, 1),
    });
    const conversationFound = await filterConversationsUseCase.execute({
      start: new Date(2021, 11, 1),
      end: new Date(2022, 1, 1),
    });
    expect(conversationFound).toHaveLength(1);
  });
});
