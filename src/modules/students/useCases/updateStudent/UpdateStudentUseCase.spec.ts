import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { InMemoryClassroomsRepository } from '@modules/courses/repositories/in-memory/InMemoryClassroomsRepository';
import { InMemoryStudentsRepository } from '@modules/students/repositories/in-memory/InMemoryStudentsRepository';

import { UpdateStudentUseCase } from './UpdateStudentUseCase';

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let inMemoryClassroomsRepository: InMemoryClassroomsRepository;
let updateStudentUseCase: UpdateStudentUseCase;

describe('Update Student Use Case', () => {
  beforeEach(async () => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    inMemoryClassroomsRepository = new InMemoryClassroomsRepository();
    updateStudentUseCase = new UpdateStudentUseCase(
      inMemoryStudentsRepository,
      inMemoryClassroomsRepository,
    );
  });

  it('Should be able to update a student', async () => {
    const course = await inMemoryClassroomsRepository.create({
      fk_course: '12345',
      semester: 1,
      year: 2021,
    });
    const student = await inMemoryStudentsRepository.create({
      cellphone: '(15) 123456789',
      fk_classroom: course.id,
      name: 'Giovanni Guarnieri',
    });
    const data = {
      cellphone: '(16) 433141234',
      fk_classroom: course.id,
      name: 'Giovanni Francesco',
    };
    const studentUpdated = await updateStudentUseCase.execute(student.id, data);
    expect(studentUpdated).toMatchObject(data);
  });

  it('Should not be able to update a student with invalid id', async () => {
    expect(async () => {
      const course = await inMemoryClassroomsRepository.create({
        fk_course: '12345',
        semester: 1,
        year: 2021,
      });
      const student = await inMemoryStudentsRepository.create({
        cellphone: '(15) 123456789',
        fk_classroom: course.id,
        name: 'Giovanni Guarnieri',
      });
      const data = {
        cellphone: '(16) 433141234',
        fk_classroom: '12345',
        name: 'Giovanni Francesco',
      };
      await updateStudentUseCase.execute(student.id, data);
    }).rejects.toBeInstanceOf(BuscaAtivaException);
  });

  it('Should not be able to update a student with invalid id', async () => {
    expect(async () => {
      const data = {
        cellphone: '(16) 433141234',
        fk_classroom: '1234',
        name: 'Giovanni Francesco',
      };
      await updateStudentUseCase.execute('1234', data);
    }).rejects.toBeInstanceOf(BuscaAtivaException);
  });
});
