import { Router } from 'express';

// Si queremos cambiar de persistencia - solo descomentar/comentar
// import CourseService from '../services/filesystem/courses.service.js';
import CourseService from '../services/db/courses.service.js';

const router = Router();
const coursesService = new CourseService();


// Completar Router
router.get('/', async (req, res) => {
    try {
        let courses = await coursesService.getAll();
        res.send(courses);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudieron obtener los cursos." });
    }
})

router.post('/', async (req, res) => {
    try {
        let {title, description, teacherId, students } = req.body;
        const nuevoCurso = {title, description, teacherId, students};
        await coursesService.save(nuevoCurso)
        res.status(201).send({ result: 'success', payload: nuevoCurso })
    } catch (error) {
        console.error("No se pudo crear curso con moongose: " + error);
        res.status(500).send({ error: "No se pudo crear curso con moongose", message: error });
    }

})

export default router;