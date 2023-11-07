import { Router } from 'express';
import * as CoursController from '../controllers/courses.controlers.js'

const router = Router();

router.get('/', CoursController.getAllCourses)

router.post('/', CoursController.saveCourses)


export default router;