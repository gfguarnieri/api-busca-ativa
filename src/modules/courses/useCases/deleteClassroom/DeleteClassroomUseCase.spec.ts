import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { InMemoryClassroomsRepository } from '@modules/courses/repositories/in-memory/InMemoryClassroomsRepository';

import { DeleteClassroomUseCase } from './DeleteClassroomUseCase';

let classroomRepository: InMemoryClassroomsRepository;
let deleteClassroomUseCase: DeleteClassroomUseCase;

describe('Delete Classroom Use Case', () => {
  beforeEach(async () => {
    classroomRepository = new InMemoryClassroomsRepository();
    deleteClassroomUseCase = new DeleteClassroomUseCase(classroomRepository);
  });

  it('Should be able to delete a classroom', async () => {
    const classroom = await classroomRepository.create({ fk_course: '1234', semester: 2, year: 2021 });
    await deleteClassroomUseCase.execute(classroom.id);
    expect(await classroomRepository.getAll()).toHaveLength(0);
  });

  it('Should not be able to delete a classroom with invalid id', async () => {
    expect(async () => {
      await deleteClassroomUseCase.execute('0000');
    }).rejects.toBeInstanceOf(BuscaAtivaException);
  });
});
