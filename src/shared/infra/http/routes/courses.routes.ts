import { CreateCourseController } from '@modules/courses/useCases/createCourse/CreateCourseController';
import { DeleteCourseController } from '@modules/courses/useCases/deleteCourse/DeleteCourseController';
import { FindCourseController } from '@modules/courses/useCases/findCourse/FindCourseController';
import { ListCoursesController } from '@modules/courses/useCases/listCourses/ListCoursesController';
import { UpdateCourseController } from '@modules/courses/useCases/updateCourse/UpdateCourseController';
import { Router } from 'express';

const createCourseController = new CreateCourseController();
const updateCourseController = new UpdateCourseController();
const deleteCourseController = new DeleteCourseController();
const listCoursesController = new ListCoursesController();
const findCourseController = new FindCourseController();

const coursesRoutes = Router();

coursesRoutes.post('/', createCourseController.handle);
coursesRoutes.put('/:id', updateCourseController.handle);
coursesRoutes.delete('/:id', deleteCourseController.handle);
coursesRoutes.get('/', listCoursesController.handle);
coursesRoutes.get('/:id', findCourseController.handle);

export { coursesRoutes };
