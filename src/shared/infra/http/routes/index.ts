import { Router } from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { authenticateRoutes } from './authenticate.routes';
import { classroomsRoutes } from './classrooms.routes';
import { coursesRoutes } from './courses.routes';
import { studentsRoutes } from './students.routes';

const router = Router();

router.use('/auth', authenticateRoutes);

router.use(ensureAdmin);

router.use('/courses', coursesRoutes);
router.use('/classrooms', classroomsRoutes);
router.use('/students', studentsRoutes);

export { router };
