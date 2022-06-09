import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { InMemoryClassroomsRepository } from '@modules/courses/repositories/in-memory/InMemoryClassroomsRepository';
import { InMemoryStudentsRepository } from '@modules/students/repositories/in-memory/InMemoryStudentsRepository';

import { CreateStudentUseCase } from './CreateStudentUseCase';

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let inMemoryClassroomsRepository: InMemoryClassroomsRepository;
let createStudentUseCase: CreateStudentUseCase;

describe('Create Student Use Case', () => {
  beforeEach(async () => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    inMemoryClassroomsRepository = new InMemoryClassroomsRepository();
    createStudentUseCase = new CreateStudentUseCase(
      inMemoryStudentsRepository,
      inMemoryClassroomsRepository,
    );
  });

  it('Should be able to create a new student', async () => {
    const classroom = await inMemoryClassroomsRepository.create({
      fk_course: '1234',
      semester: 2,
      year: 2020,
    });
    const student = await createStudentUseCase.execute({
      name: 'Giovanni Guarnieri',
      cellphone: '(15) 123451234',
      fk_classroom: classroom.id,
    });
    expect(student).toHaveProperty('id');
  });

  it('Should not be able to create a new student with invalid classroom', async () => {
    expect(async () => {
      await createStudentUseCase.execute({
        name: 'Giovanni Guarnieri',
        cellphone: '(15) 123451234',
        fk_classroom: '1234',
      });
    }).rejects.toBeInstanceOf(BuscaAtivaException);
  });
});
