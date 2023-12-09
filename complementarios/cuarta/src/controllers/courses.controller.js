import { coursesService } from '../services/repository/services.js';
import {stringify} from "mocha/lib/utils.js";

export const getAll = async (req, res) => {
    try {
        let courses = await coursesService.getAll();
        res.json(courses);
    } catch (error) {
        console.error(error); //Remplazar por loggers
        res.status(500).send({error:  error, message: "No se pudo obtener los cursos."});
    }
}

export const save = async (req, res) => {

    try {
        let result = await coursesService.saveCourse(req.body);
        res.status(201).send(result);
    } catch (error) {
        console.error(error); //Remplazar por loggers.
        res.status(500).send({error:  error, message: "No se pudo guardar el curso."});
    }
}


