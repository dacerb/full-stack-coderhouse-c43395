import {Router} from "express";
import { userModel } from "../models/user.model.js";

const router = Router();


router.get('/', async (req, res) => {
    try {
        let users = await userModel.find();
        console.log(users);

        res.send({
            result: "success",
            payload: users
        });

    } catch (error) {
        console.error('No fue posible recuperar los datos de usuarios con moongose: ' + error);
        return res.status(500).send({
            error: "No se pudo obtener usuarios con moongose",
            message: error
        });
    }
});


router.post('/',async (req, res) => {
    try {
        let {first_name, last_name, email} = req.body
        let newUser = await  userModel.create({first_name, last_name, email})
        console.log(newUser)

        res.status(201).send({
            resutl: "success",
            payload: newUser
        })
    }
    catch (error) {
        console.error('No fue posible crear usuarios  con moongose: '+ error)
        return res.status(500).send({
            error: "No fue posible crear usuarios  con moongose",
            message: error
        })

    }
});

router.put('/:id',async (req, res) => {
    try {
        let userUpdated = req.body
        let updatedUser = await  userModel.updateOne({_id: req.params.id}, userUpdated)
        res.status(202).send({
            resutl: "success",
            payload: updatedUser
        })
    }
    catch (error) {
        console.error('No fue posible actualizar usuarios  con moongose: '+ error)
        return res.status(500).send({
            error: "No fue posible actualizar usuarios  con moongose",
            message: error
        })

    }
});


router.delete('/:id',async (req, res) => {
    try {
        let {id} = req.params
        let resultUserDelete = await  userModel.deleteOne({_id: id})
        res.status(202).send({
            resutl: "success",
            payload: resultUserDelete
        })
    }
    catch (error) {
        console.error('No fue posible actualizar usuarios  con moongose: '+ error)
        return res.status(500).send({
            error: "No fue posible actualizar usuarios  con moongose",
            message: error
        })

    }
});


export default  router;