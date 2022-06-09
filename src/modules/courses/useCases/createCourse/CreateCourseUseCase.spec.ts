import { InMemoryCoursesRepository } from '../../repositories/in-memory/InMemoryCoursesRepositoy';
import { CreateCourseUseCase } from './CreateCourseUseCase';

let coursesRepository: InMemoryCoursesRepository;
let createCourseUseCase: CreateCourseUseCase;

describe('Create course use case', () => {
  beforeEach(async () => {
    coursesRepository = new InMemoryCoursesRepository();
    createCourseUseCase = new CreateCourseUseCase(coursesRepository);
  });

  it('Should be able to create a new course', async () => {
    const data = {
      name: 'Desenvolvimento de Sistemas',
      coordinator: 'Felipe Vieira',
      module_duration: 'S',
    };
    const course = await createCourseUseCase.execute(data);
    expect(course).toHaveProperty('id');
  });

  it('Should not be able to create a new course with the same name', async () => {
    expect(async () => {
      const data = {
        name: 'Desenvolvimento de Sistemas',
        coordinator: 'Felipe Vieira',
        module_duration: 'S',
      };
      await createCourseUseCase.execute(data);
      await createCourseUseCase.execute(data);
    }).rejects.toBeInstanceOf(Error);
  });
});
