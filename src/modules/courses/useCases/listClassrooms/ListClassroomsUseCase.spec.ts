import { InMemoryClassroomsRepository } from '@modules/courses/repositories/in-memory/InMemoryClassroomsRepository';

import { ListClassroomsUseCase } from './ListClassroomsUseCase';

let classroomRepository: InMemoryClassroomsRepository;
let listClassroomsUseCase: ListClassroomsUseCase;
describe('List Classrooms Use Case', () => {
  beforeEach(async () => {
    classroomRepository = new InMemoryClassroomsRepository();
    listClassroomsUseCase = new ListClassroomsUseCase(classroomRepository);
  });
  it('Should be possible list all classrooms', async () => {
    await classroomRepository.create({
      fk_course: '1234', semester: 2, year: 2021,
    });
    await classroomRepository.create({
      fk_course: '1235', semester: 2, year: 2021,
    });
    const courses = await listClassroomsUseCase.execute();
    expect(courses).toHaveLength(2);
  });
});
