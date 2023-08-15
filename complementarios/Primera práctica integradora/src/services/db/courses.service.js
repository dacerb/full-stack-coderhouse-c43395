import e from "express";
import { coursesModel } from "./models/courses.js";

export default class CoursesService {
    constructor() {
        console.log("Working courses with Database persistence in mongodb");
    }

    getAll = async () => {
        let courses = await coursesModel.find() ;
        console.log("courses: ", courses);
        return courses.map(course => course.toObject());
    }
    save = async (course) => {
        // Completar
        try {
            const nuevoCurso = await coursesModel.create(course);
            return {nuevoCurso: nuevoCurso, status: true}
        } catch (error) {
            return {status: false, msg: error}
        }
    }
}
