import { Router } from 'express';
import * as ControlerStudens from '../controllers/student.controllers.js'



const router = Router();

//TODO: Migrar a patrón controller:

router.get('/', ControlerStudens.GetStudents)

router.post('/', ControlerStudens.ceateStudent)

export default router;