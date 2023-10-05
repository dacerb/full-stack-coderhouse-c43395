import { Router } from 'express';
import {isValidPassword, generateJWToken, createHash} from '../util.js';
//Service import
import StudentService from '../services/db/students.service.js';

const router = Router();
const studentService = new StudentService();

router.post("/login", async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await studentService.findByUsername(email);
        console.log("Usuario encontrado para login:");
        console.log(user);
        if (!user) {
            console.warn("User doesn't exists with username: " + email);
            return res.status(400).send({error: "Not found", message: "Usuario no encontrado con username: " + email});
        }
        if (!isValidPassword(user, password)) {
            console.warn("Invalid credentials for user: " + email);
            return res.status(401).send({status:"error",error:"El usuario y la contraseña no coinciden!"});
        }
        const tokenUser= {
            name : `${user.name} ${user.lastName}`,
            email: user.email,
            age: user.age,
            role: user.role
        };
        const access_token = generateJWToken(tokenUser);
        console.log(access_token);
        //Con Cookie
        res.cookie('jwtCookieToken', access_token, {
            maxAge: 60000,
            httpOnly: true
        });
        res.send({message: "Login successful!"});
        //const access_token = generateJWToken(tokenUser); //-->Con access_token
    } catch (error) {
        console.error(error);
        return res.status(500).send({status:"error",error:"Error interno de la applicacion."});
    }
});

//TODO: agregar metodo de registrar estudiante:
router.post("/register", async (req, res)=>{
    const data = req.body;

    try {
        // Valido si el usuario existe
        const user = await studentService.findByUsername(data.email);
        if (user) return res.status(401).send({message: "El usuario ya existe." })

        // encriptamos la password
        let newUserObj = data
        newUserObj.password = createHash(data.password)

        // crear usuario
        const newUser = await studentService.save(newUserObj);
        if (newUser) {
            return res.status(201).send({
                message: "usuario creado con exito."
            })
        }

        return res.status(400).send({
            message: "No fue posible crear el usuario."
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({status:"error",error:"Error interno de la applicacion."});
    }
});

export default router;