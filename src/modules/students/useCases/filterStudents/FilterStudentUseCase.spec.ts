import { InMemoryStudentsRepository } from '@modules/students/repositories/in-memory/InMemoryStudentsRepository';

import { FilterStudentsUseCase } from './FilterStudentsUseCase';

let studentsRepository: InMemoryStudentsRepository;
let filterStudentsUseCase: FilterStudentsUseCase;
describe('Filter Students Use Case', () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository();
    filterStudentsUseCase = new FilterStudentsUseCase(studentsRepository);
  });

  it('Should be able to filter students by name and fk_classroom', async () => {
    const student = await studentsRepository.create({
      cellphone: '(15) 12345-1234',
      fk_classroom: '1',
      name: 'Giovanni',
    });
    const students = await filterStudentsUseCase.execute({ name: 'Giov', fk_classroom: '1' });
    expect(students[0]).toMatchObject(student);
  });

  it('Should be able to filter students by name', async () => {
    const student = await studentsRepository.create({
      cellphone: '(15) 12345-1234',
      fk_classroom: '1',
      name: 'Giovanni',
    });
    const students = await filterStudentsUseCase.execute({ name: 'Giov' });
    expect(students[0]).toMatchObject(student);
  });

  it('Should be able to filter students by fk_classroom', async () => {
    const student = await studentsRepository.create({
      cellphone: '(15) 12345-1234',
      fk_classroom: '1',
      name: 'Giovanni',
    });
    const students = await filterStudentsUseCase.execute({ fk_classroom: '1' });
    expect(students[0]).toMatchObject(student);
  });

  it('Should be able to list all students', async () => {
    const student = await studentsRepository.create({
      cellphone: '(15) 12345-1234',
      fk_classroom: '1',
      name: 'Giovanni',
    });
    const students = await filterStudentsUseCase.execute({});
    expect(students[0]).toMatchObject(student);
  });
});
