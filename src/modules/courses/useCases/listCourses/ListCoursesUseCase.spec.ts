import { InMemoryCoursesRepository } from '@modules/courses/repositories/in-memory/InMemoryCoursesRepositoy';

import { ListCourseUseCase } from './ListCoursesUseCase';

let inMemoryCoursesRepository: InMemoryCoursesRepository;
let listCourseUseCase: ListCourseUseCase;
describe('List Courses Use Case', () => {
  beforeEach(() => {
    inMemoryCoursesRepository = new InMemoryCoursesRepository();
    listCourseUseCase = new ListCourseUseCase(inMemoryCoursesRepository);
  });

  it('Should be able to list all courses', async () => {
    await inMemoryCoursesRepository.create({
      name: 'Desenvolvimento de Sistemas',
      coordinator: 'Felipe Vieira',
      module_duration: 'S',
    });
    await inMemoryCoursesRepository.create({
      name: 'Informática para Internet',
      coordinator: 'Giovanni Guarnieri',
      module_duration: 'S',
    });
    const courses = await listCourseUseCase.execute();
    expect(courses).toHaveLength(2);
  });
});
