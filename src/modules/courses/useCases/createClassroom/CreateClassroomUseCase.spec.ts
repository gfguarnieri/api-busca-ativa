import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { InMemoryClassroomsRepository } from '@modules/courses/repositories/in-memory/InMemoryClassroomsRepository';
import { InMemoryCoursesRepository } from '@modules/courses/repositories/in-memory/InMemoryCoursesRepositoy';

import { CreateClassRoomUseCase } from './CreateClassroomUseCase';

let classroomRepository: InMemoryClassroomsRepository;
let coursesRepository: InMemoryCoursesRepository;
let createClassRoomUseCase: CreateClassRoomUseCase;
describe('Create classroom use case', () => {
  beforeEach(() => {
    classroomRepository = new InMemoryClassroomsRepository();
    coursesRepository = new InMemoryCoursesRepository();
    createClassRoomUseCase = new CreateClassRoomUseCase(classroomRepository, coursesRepository);
  });

  it('Should be able to create a new classroom', async () => {
    const course = await coursesRepository.create({
      name: 'Desenvolvimento de Sistemas',
      coordinator: 'Felipe Vieira',
      module_duration: 'S',
    });
    const data = {
      year: 2021,
      semester: 1,
      fk_course: course.id,
    };
    const classroom = await createClassRoomUseCase.execute(data);
    expect(classroom).toHaveProperty('id');
  });

  it('Should not be able to create a new classroom with invalid course id', async () => {
    expect(async () => {
      const data = {
        year: 2021,
        semester: 2,
        fk_course: '1234',
      };
      await createClassRoomUseCase.execute(data);
    }).rejects.toBeInstanceOf(BuscaAtivaException);
  });
});
