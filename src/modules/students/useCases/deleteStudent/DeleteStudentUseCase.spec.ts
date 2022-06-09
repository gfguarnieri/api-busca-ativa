import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { InMemoryStudentsRepository } from '@modules/students/repositories/in-memory/InMemoryStudentsRepository';

import { DeleteStudentUseCase } from './DeleteStudentUseCase';

let studentsRepository: InMemoryStudentsRepository;
let deleteStudentUseCase: DeleteStudentUseCase;

describe('Delete Student Use Case', () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository();
    deleteStudentUseCase = new DeleteStudentUseCase(studentsRepository);
  });

  it('Should be able to delete a student', async () => {
    const student = await studentsRepository.create({
      cellphone: '(15) 1234-12345',
      fk_classroom: '1234',
      name: 'Giovanni Guarnieri',
    });
    await deleteStudentUseCase.execute(student.id);
    expect(await studentsRepository.filter()).toHaveLength(0);
  });

  it('Should not be able to delete a student with invalid id', async () => {
    expect(async () => {
      await deleteStudentUseCase.execute('123');
    }).rejects.toBeInstanceOf(BuscaAtivaException);
  });
});
