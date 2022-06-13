import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { InMemoryAdminsRepository } from '@modules/admins/repositories/in-memory/InMemoryAdminsRepository';
import { InMemoryConversationsRepository } from '@modules/students/repositories/in-memory/InMemoryConversationsRepository';
import { InMemoryStudentsRepository } from '@modules/students/repositories/in-memory/InMemoryStudentsRepository';

import { UpdateConversationUseCase } from './UpdateConversationUseCase';

let inMemoryConversationsRepository: InMemoryConversationsRepository;
let inMemoryAdminsRepository: InMemoryAdminsRepository;
let inMemoryStudentsRepository: InMemoryStudentsRepository;
let updateConversationUseCase: UpdateConversationUseCase;

describe('Update Conversation Use Case', () => {
  beforeEach(() => {
    inMemoryAdminsRepository = new InMemoryAdminsRepository();
    inMemoryConversationsRepository = new InMemoryConversationsRepository();
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    updateConversationUseCase = new UpdateConversationUseCase(
      inMemoryConversationsRepository,
      inMemoryStudentsRepository,
      inMemoryAdminsRepository,
    );
  });

  it('Should be able to update a conversation', async () => {
    const admin = await inMemoryAdminsRepository.create({
      email: 'gfguarnieri@hotmail.com',
      name: 'Giovanni Guarnieri',
      password: '123456',
    });

    const student = await inMemoryStudentsRepository.create({
      cellphone: '15123412345',
      fk_classroom: '0000',
      name: 'Student 1',
    });

    const conversation = await inMemoryConversationsRepository.create({
      description: 'description',
      fk_admin: admin.id,
      fk_student: student.id,
    });

    const conversationUpdated = await updateConversationUseCase.execute(conversation.id, {
      description: 'description updated',
      fk_admin: admin.id,
      fk_student: student.id,
    });

    expect(conversationUpdated.description).toBe('description updated');
  });

  it('Should not be able to update a conversation with invalid student', async () => {
    expect(async () => {
      const admin = await inMemoryAdminsRepository.create({
        email: 'gfguarnieri@hotmail.com',
        name: 'Giovanni Guarnieri',
        password: '123456',
      });

      const student = await inMemoryStudentsRepository.create({
        cellphone: '15123412345',
        fk_classroom: '0000',
        name: 'Student 1',
      });

      const conversation = await inMemoryConversationsRepository.create({
        description: 'description',
        fk_admin: admin.id,
        fk_student: student.id,
      });

      await updateConversationUseCase.execute(conversation.id, {
        description: 'description updated',
        fk_admin: admin.id,
        fk_student: 'invalid',
      });
    }).rejects.toBeInstanceOf(BuscaAtivaException);
  });

  it('Should not be able to update a conversation with invalid id', async () => {
    expect(async () => {
      const admin = await inMemoryAdminsRepository.create({
        email: 'gfguarnieri@hotmail.com',
        name: 'Giovanni Guarnieri',
        password: '123456',
      });

      await updateConversationUseCase.execute('invalid', {
        description: 'description updated',
        fk_admin: admin.id,
        fk_student: 'invalid',
      });
    }).rejects.toBeInstanceOf(BuscaAtivaException);
  });

  it('Should not be able to update a conversation with invalid admin', async () => {
    expect(async () => {
      const admin = await inMemoryAdminsRepository.create({
        email: 'gfguarnieri@hotmail.com',
        name: 'Giovanni Guarnieri',
        password: '123456',
      });

      const student = await inMemoryStudentsRepository.create({
        cellphone: '15123412345',
        fk_classroom: '0000',
        name: 'Student 1',
      });

      const conversation = await inMemoryConversationsRepository.create({
        description: 'description',
        fk_admin: admin.id,
        fk_student: student.id,
      });

      await updateConversationUseCase.execute(conversation.id, {
        description: 'description updated',
        fk_admin: 'invalid',
        fk_student: student.id,
      });
    }).rejects.toBeInstanceOf(BuscaAtivaException);
  });
});
