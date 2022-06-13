import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { InMemoryAdminsRepository } from '@modules/admins/repositories/in-memory/InMemoryAdminsRepository';
import { InMemoryConversationsRepository } from '@modules/students/repositories/in-memory/InMemoryConversationsRepository';
import { InMemoryStudentsRepository } from '@modules/students/repositories/in-memory/InMemoryStudentsRepository';

import { CreateConversationUseCase } from './CreateConversationUseCase';

let inMemoryConversationsRepository: InMemoryConversationsRepository;
let inMemoryAdminsRepository: InMemoryAdminsRepository;
let inMemoryStudentsRepository: InMemoryStudentsRepository;
let createConversationUseCase: CreateConversationUseCase;

describe('Create Conversation Use Case', () => {
  beforeEach(() => {
    inMemoryAdminsRepository = new InMemoryAdminsRepository();
    inMemoryConversationsRepository = new InMemoryConversationsRepository();
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    createConversationUseCase = new CreateConversationUseCase(
      inMemoryConversationsRepository,
      inMemoryStudentsRepository,
      inMemoryAdminsRepository,
    );
  });

  it('Should be able create a new conversation', async () => {
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
    const conversation = await createConversationUseCase.execute({
      description: 'description',
      fk_admin: admin.id,
      fk_student: student.id,
    });
    expect(conversation).toHaveProperty('id');
  });

  it('Should not  be able create a new conversation with invalid student', async () => {
    expect(async () => {
      const admin = await inMemoryAdminsRepository.create({
        email: 'gfguarnieri@hotmail.com',
        name: 'Giovanni Guarnieri',
        password: '123456',
      });
      await createConversationUseCase.execute({
        description: 'description',
        fk_admin: admin.id,
        fk_student: 'invalid',
      });
    }).rejects.toBeInstanceOf(BuscaAtivaException);
  });

  it('Should not  be able create a new conversation with invalid admin', async () => {
    expect(async () => {
      const student = await inMemoryStudentsRepository.create({
        cellphone: '15123412345',
        fk_classroom: '0000',
        name: 'Student 1',
      });
      await createConversationUseCase.execute({
        description: 'description',
        fk_admin: 'invalid',
        fk_student: student.id,
      });
    }).rejects.toBeInstanceOf(BuscaAtivaException);
  });
});
