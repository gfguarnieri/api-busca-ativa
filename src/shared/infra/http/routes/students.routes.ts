import { CreateStudentController } from '@modules/students/useCases/createStudent/CreateStudentController';
import { DeleteStudentController } from '@modules/students/useCases/deleteStudent/DeleteStudentController';
import { FilterStudentsController } from '@modules/students/useCases/filterStudents/FilterStudentsController';
import { UpdateStudentController } from '@modules/students/useCases/updateStudent/UpdateStudentController';
import { Router } from 'express';

const studentsRoutes = Router();

const createStudentController = new CreateStudentController();
const deleteStudentController = new DeleteStudentController();
const updateStudentController = new UpdateStudentController();
const filterStudentsController = new FilterStudentsController();

studentsRoutes.post('/', createStudentController.handle);
studentsRoutes.put('/:id', updateStudentController.handle);
studentsRoutes.delete('/:id', deleteStudentController.handle);
studentsRoutes.get('/', filterStudentsController.handle);

export { studentsRoutes };
