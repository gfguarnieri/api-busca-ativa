import { Router } from 'express';

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';
import { authenticateRoutes } from './authenticate.routes';
import { classroomsRoutes } from './classrooms.routes';
import { conversationsRoutes } from './conversations.routes';
import { coursesRoutes } from './courses.routes';
import { studentsRoutes } from './students.routes';

const router = Router();

router.use('/auth', authenticateRoutes);

router.use(ensureAuthenticate);

router.use('/courses', coursesRoutes);
router.use('/classrooms', classroomsRoutes);
router.use('/students', studentsRoutes);
router.use('/conversations', conversationsRoutes);

export { router };
