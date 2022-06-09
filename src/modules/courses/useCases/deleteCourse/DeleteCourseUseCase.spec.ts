import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { InMemoryCoursesRepository } from '@modules/courses/repositories/in-memory/InMemoryCoursesRepositoy';

import { DeleteCourseUseCase } from './DeleteCourseUseCase';

let inMemoryCoursesRepository: InMemoryCoursesRepository;
let deleteCourseUseCase: DeleteCourseUseCase;

describe('Delete course use case', () => {
  beforeEach(() => {
    inMemoryCoursesRepository = new InMemoryCoursesRepository();
    deleteCourseUseCase = new DeleteCourseUseCase(inMemoryCoursesRepository);
  });

  it('Should be possible delete course by id', async () => {
    const course = await inMemoryCoursesRepository.create({
      name: 'Desenvolvimento de Sistemas',
      coordinator: 'Felipe Vieira',
      module_duration: 'S',
    });
    await deleteCourseUseCase.execute(course.id);
    const findCourse = await inMemoryCoursesRepository.findById(course.id);
    expect(findCourse).toBeUndefined();
  });

  it('Should not be possible delete course with invalid id', async () => {
    expect(async () => {
      await inMemoryCoursesRepository.create({
        name: 'Desenvolvimento de Sistemas',
        coordinator: 'Felipe Vieira',
        module_duration: 'S',
      });
      await deleteCourseUseCase.execute('123456');
    }).rejects.toBeInstanceOf(BuscaAtivaException);
  });
});
