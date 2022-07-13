import { CreateClassroomController } from '@modules/courses/useCases/createClassroom/CreateClassroomController';
import { DeleteClassroomController } from '@modules/courses/useCases/deleteClassroom/DeleteClassroomController';
import { ImportListStudentsController } from '@modules/courses/useCases/importListStudents/ImportListStudentsController';
import { ListClassroomsController } from '@modules/courses/useCases/listClassrooms/ListClassroomsController';
import { UpdateClassroomController } from '@modules/courses/useCases/updateClassroom/UpdateClassroomController';
import { Router } from 'express';
import multer from 'multer';

const classroomsRoutes = Router();

const createClassroomController = new CreateClassroomController();
const updateClassRoomController = new UpdateClassroomController();
const deleteClassroomUseCase = new DeleteClassroomController();
const listClassroomsController = new ListClassroomsController();
const importListStudentsController = new ImportListStudentsController();

const multerFiles = multer({
  dest: 'files/',
});

classroomsRoutes.post('/', createClassroomController.handle);
classroomsRoutes.post('/:id', multerFiles.single('list'), importListStudentsController.handle);
classroomsRoutes.put('/:id', updateClassRoomController.handle);
classroomsRoutes.delete('/:id', deleteClassroomUseCase.handle);
classroomsRoutes.get('/', listClassroomsController.handle);

export { classroomsRoutes };
