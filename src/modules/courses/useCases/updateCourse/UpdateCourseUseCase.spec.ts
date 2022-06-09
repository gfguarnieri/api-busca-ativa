import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { InMemoryCoursesRepository } from '@modules/courses/repositories/in-memory/InMemoryCoursesRepositoy';

import { UpdateCourseUseCase } from './UpdateCourseUseCase';

let inMemoryCoursesRepository: InMemoryCoursesRepository;
let updateCourseUseCase: UpdateCourseUseCase;

describe('Update Course Use Case', () => {
  beforeEach(async () => {
    inMemoryCoursesRepository = new InMemoryCoursesRepository();
    updateCourseUseCase = new UpdateCourseUseCase(inMemoryCoursesRepository);
  });

  it('Should be able to update a course', async () => {
    const course = await inMemoryCoursesRepository.create({
      coordinator: 'Giovanni Guarnieri',
      name: 'Desenvolvimento de Sistemas',
      module_duration: 'S',
    });
    const courseUpdated = await updateCourseUseCase.execute(course.id, {
      name: 'Desenvolvimento de Sistemas',
      coordinator: 'Felipe Roberto',
      module_duration: 'S',
    });
    expect(courseUpdated.coordinator).toBe('Felipe Roberto');
  });

  it('Should not be able to update a course with invalid Id', async () => {
    expect(async () => {
      await updateCourseUseCase.execute('123456', {
        name: 'Desenvolvimento de Sistemas',
        coordinator: 'Felipe Roberto',
        module_duration: 'S',
      });
    }).rejects.toBeInstanceOf(BuscaAtivaException);
  });
});
