import { Router } from 'express';

import { classroomsRoutes } from './classrooms.routes';
import { coursesRoutes } from './courses.routes';
import { studentsRoutes } from './students.routes';

const router = Router();

router.use('/courses', coursesRoutes);
router.use('/classrooms', classroomsRoutes);
router.use('/students', studentsRoutes);

export { router };
