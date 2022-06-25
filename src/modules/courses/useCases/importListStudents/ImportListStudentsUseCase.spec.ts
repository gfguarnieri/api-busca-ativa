import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { InMemoryClassroomsRepository } from '@modules/courses/repositories/in-memory/InMemoryClassroomsRepository';
import { InMemoryStudentsRepository } from '@modules/students/repositories/in-memory/InMemoryStudentsRepository';

import { ImportListStudentsUseCase } from './ImportListStudentsUseCase';

let importListStudentsUseCase:ImportListStudentsUseCase;
let studentsRepository: InMemoryStudentsRepository;
let classroomsRepository: InMemoryClassroomsRepository;

describe('Import List Students Use Case', () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository();
    classroomsRepository = new InMemoryClassroomsRepository();
    importListStudentsUseCase = new ImportListStudentsUseCase(
      studentsRepository,
      classroomsRepository,
    );
  });
  it('Should be able to import a list of students on a classroom', async () => {
    const classroom = await classroomsRepository.create({
      fk_course: '1234',
      semester: 1,
      year: 2022,
    });
    const list = [
      'Student 1',
      'Student 2',
      'Student 3',
    ];
    await importListStudentsUseCase.execute(classroom.id, list);
    const students = await studentsRepository.filter();
    expect(students).toHaveLength(list.length);
  });

  it('Should not be able to import a list of students on a invalid classroom', async () => {
    expect(async () => {
      const list = [
        'Student 1',
        'Student 2',
        'Student 3',
      ];
      await importListStudentsUseCase.execute('0000', list);
    }).rejects.toBeInstanceOf(BuscaAtivaException);
  });
});
