import { CreateClassroomController } from '@modules/courses/useCases/createClassroom/CreateClassroomController';
import { DeleteClassroomController } from '@modules/courses/useCases/deleteClassroom/DeleteClassroomController';
import { ListClassroomsController } from '@modules/courses/useCases/listClassrooms/ListClassroomsController';
import { UpdateClassroomController } from '@modules/courses/useCases/updateClassroom/UpdateClassroomController';
import { Router } from 'express';

const classroomsRoutes = Router();

const createClassroomController = new CreateClassroomController();
const updateClassRoomController = new UpdateClassroomController();
const deleteClassroomUseCase = new DeleteClassroomController();
const listClassroomsController = new ListClassroomsController();

classroomsRoutes.post('/', createClassroomController.handle);
classroomsRoutes.put('/:id', updateClassRoomController.handle);
classroomsRoutes.delete('/:id', deleteClassroomUseCase.handle);
classroomsRoutes.get('/', listClassroomsController.handle);

export { classroomsRoutes };
