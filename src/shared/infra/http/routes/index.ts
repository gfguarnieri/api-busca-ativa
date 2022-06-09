import { Router } from 'express';

import { classroomsRoutes } from './classrooms.routes';
import { coursesRoutes } from './courses.routes';

const router = Router();

router.use('/courses', coursesRoutes);
router.use('/classrooms', classroomsRoutes);

export { router };
