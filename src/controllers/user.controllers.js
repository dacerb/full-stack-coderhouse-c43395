import { userManager  } from "../services/factory.js";
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
            console.log('FALSE')
            permitAdminDelete = Boolean();
        }
        if ( adminDelete.toLowerCase().trim() === "true"){
            console.log('TRUE')
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

export async function getUserById(req, res, next) {
    return res.send(
        {
            message: "hola getUserById"
        }
    );
}