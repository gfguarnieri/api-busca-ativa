import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { InMemoryClassroomsRepository } from '@modules/courses/repositories/in-memory/InMemoryClassroomsRepository';
import { InMemoryCoursesRepository } from '@modules/courses/repositories/in-memory/InMemoryCoursesRepositoy';

import { UpdateClassroomUseCase } from './UpdateClassroomUseCase';

let classroomRepository: InMemoryClassroomsRepository;
let coursesRepository: InMemoryCoursesRepository;
let updateClassroomUseCase: UpdateClassroomUseCase;

describe('Update Classroom Use Case', () => {
  beforeEach(() => {
    classroomRepository = new InMemoryClassroomsRepository();
    coursesRepository = new InMemoryCoursesRepository();
    updateClassroomUseCase = new UpdateClassroomUseCase(classroomRepository, coursesRepository);
  });

  it('Should be able to update a classroom', async () => {
    const course = await coursesRepository.create({
      name: 'Desenvolvimento de Sistemas',
      coordinator: 'Felipe Vieira',
      module_duration: 'S',
    });
    const classroom = await classroomRepository.create({
      year: 2021,
      semester: 5,
      fk_course: course.id,
    });

    const classroomUpdated = await updateClassroomUseCase.execute(classroom.id, {
      year: 2005,
      semester: 5,
      fk_course: course.id,
    });

    expect(classroomUpdated.year).toBe(2005);
  });

  it('Should not be able to update a classroom with invalid id', async () => {
    expect(async () => {
      const course = await coursesRepository.create({
        name: 'Desenvolvimento de Sistemas',
        coordinator: 'Felipe Vieira',
        module_duration: 'S',
      });

      await updateClassroomUseCase.execute('1234', {
        year: 2005,
        semester: 5,
        fk_course: course.id,
      });
    }).rejects.toBeInstanceOf(BuscaAtivaException);
  });

  it('Should not be able to update a classroom with fk_course invalid', async () => {
    expect(async () => {
      await updateClassroomUseCase.execute('1234', {
        year: 2005,
        semester: 5,
        fk_course: '1234',
      });
    }).rejects.toBeInstanceOf(BuscaAtivaException);
  });
});
