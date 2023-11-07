import Students from "../db/dao/students.dao.js";
import Courses from "../db/dao/courses.dao.js";
import StudentRepository from "./students.repository.js";
import CourseRepository from "./coruses.repository.js";

const studentDao = new Students();
const courseDao = new Courses();

export const studentService = new StudentRepository(studentDao);
export const courseService = new CourseRepository(courseDao);