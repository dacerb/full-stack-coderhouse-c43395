import {userManager} from "../services/factory.js";
import UsersDto from '../services/dto/users.dto.js'
import MailingService from "../services/email/mailing.js";
import config from "../config/config.js";

export async function deleteUser(req, res, next) {
    const { logger } = req;
    const allUsers = await userManager.getAllUsers();
    const rolList = ["user", "premium", "admin"]
    const rolListProtected = ["admin"]
    let { limitSeconds, rol, adminDelete } = req.query; // recibo por parametros el limite en segundos
    let permitAdminDelete = false;
    let limitMilliseconds;
    let userDeleted;

    // Ayuda a que no elimine el admin por error se puede modificar
    if(adminDelete){
        if ( adminDelete.toLowerCase().trim() === "false"){
            permitAdminDelete = Boolean();
        }
        if ( adminDelete.toLowerCase().trim() === "true"){
            permitAdminDelete = Boolean(adminDelete);
        }
    }

    if (limitSeconds && isNaN(limitSeconds)) return res.status(400).send({
        status:'error',
        message: "the limitSeconds must be integer."
    });

    if (rol && !rolList.includes(rol.toLowerCase().trim())) return res.status(400).send({
        status:'error',
        message: `rol must be string in any values: ${rolList.join(", ")}.`
    });

    if (!limitSeconds) {
        const TwoDaysInSeconds = 172800;
        limitMilliseconds =  TwoDaysInSeconds * 1000; //de no recibir el parametro el valor por defecto es..
    }else {
        limitMilliseconds = parseInt(limitSeconds) * 1000;
    }

    if (!allUsers.length > 0) {
        return res.status(404).send(
            JSON.stringify({
                status: "success",
                mensaje: "not found any users"
            }, null, 4));
    }

    try {
        const usersToDelete = allUsers.filter(user => {
            const currentDate = new Date();
            const userLastLogin = new Date(user.lastLogin);
            const currentDateTimestamp = currentDate.getTime();
            const TimestampUserLastLogin = userLastLogin.getTime() + limitMilliseconds;

            // si no cumple con el filtro de rol se quita de la lista
            if (!(!rol || (user.rol.toLowerCase() === rol.toLowerCase().trim())))return false;

            // control para evitar borrar el admin a no ser que se solicite por query params
            if (!adminDelete || !permitAdminDelete) {
                if (rolListProtected.includes(user.rol.toLowerCase())) return false
            }

            const elapseTime = parseInt((currentDateTimestamp - TimestampUserLastLogin));
            if (elapseTime > limitMilliseconds) return true;

        })

        if(usersToDelete){
            const dispacher = new MailingService()
            usersToDelete.map(user => {
                return userManager.deleteUserById(user._id)
                    .then(
                    userIsDeleted => {
                        // si el usuario fue eliminado envio emial
                        if (userIsDeleted) {
                            logger.debug(`se elimino usuario ${user._id}, se notifica a: ${user.email}`)
                            dispacher.sendSimpleMail({
                                from: config.mailing.USER,
                                to: user.email,
                                subject: "¡Aviso importante sobre tu usuario!",
                                html: `<div>
                                    <h3>Queremos informate que hemos borrado tu usuario porque supero el tiempo de desconexion segun nuestra politica de usuarios.</h3>        
                                    <div>
                                    <p>
                                    <strong>Ultima conexión: ${user.lastLogin}}</strong> 
                                     <br>
                                    <span>Limites de ultimo inicio de session en dias: <strong>${(((limitMilliseconds / 1000)/3600) / 24).toFixed(1) }</strong></span>
                                    </p>
                                    </div>
                                </div>`
                            })
                            return user
                        }
                        return null
                }).catch(error => {
                    console.error('Error:', error);
                });
            })
            const deletedUser = await Promise.all(usersToDelete);
            userDeleted = deletedUser.filter(user => user !== null);
        }

        return res.status(200).send(
                {
                    limitSeconds: limitMilliseconds /1000,
                    qtyUsersDeleted: usersToDelete.length,
                    usersToDelete,
                    userDeletedIds: userDeleted.map(user => user._id),
                    permitAdminDelete
                }
        );

    }catch (error) {
        logger.error(error)
        next(error)
    }
}

export async function getAllUsers(req, res, next) {
    const { logger } = req
    const allUsers = await userManager.getAllUsers();

    if (!allUsers.length > 0) {
        return res.status(404).send(
            JSON.stringify({
                status: "success",
                mensaje: "not found any users"
            }, null, 4));
    }

    try {
        return res.status(200).send(
            allUsers.map(user => {
                return new UsersDto(user)
            })
        );
    }catch (error) {
        logger.error(error)
        next(error)
    }
}

export async function updateUserRolById(req, res, next) {
    const {logger} = req
    let { uid } = req.params;
    const {rol} = {...req.body};
    const id = uid;
    const allowedRolList = ["admin", "user", "premium"]
    try {

        // validaciones:
        if (!id) return res.status(400).send({status: "error", message: `the param id must be required.`});
        if (!rol) return res.status(400).send({status: "error", message: `the rol key must be required.`});
        if (!allowedRolList.includes(rol.trim().toLowerCase())) return res.status(400).send({status: "error", message: `the rol value must be in: (${allowedRolList.join(", ")})`});

        if (id) {
            const foundUser = await userManager.getUserById({_id: id});
            if (foundUser) {

                const updateUser = await userManager.updateUserRolById({
                    _id: id,
                    rol
                });
                return res.status(200).send({
                    message: `the user with id ${id} was updated.`,
                    result: new UsersDto(updateUser)
                });
            }
            // Si no se encuetra el usuario se responde...
            return res.status(404).send({message: `the user with id ${id} not found.`});
        }
    }catch (error) {
        logger.error(error)
        next(error)
    }




}