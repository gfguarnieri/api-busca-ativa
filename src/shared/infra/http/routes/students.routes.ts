import { CreateStudentController } from '@modules/courses/useCases/createStudent/CreateStudentController';
import { Router } from 'express';

const studentsRoutes = Router();

const createStudentController = new CreateStudentController();

studentsRoutes.post('/', createStudentController.handle);

export { studentsRoutes };
