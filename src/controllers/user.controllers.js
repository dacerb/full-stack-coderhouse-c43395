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
        const usersToDelet = allUsers.filter(user => {
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

        if(usersToDelet){
            const dispacher = new MailingService()

            usersToDelet.forEach(user => {




                // Mando mail
                if (true) {
                    console.log("Envio Mail avisando que se borro porque supero el tiempo de desconexion ultima vez ", user.lastLogin, " - ",((limitMilliseconds / 1000)/3600) / 24, "dias")


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
                }


                // elimino cuenta de la db
            })
        }




        return res.status(200).send(
                {
                    limitSeconds: limitMilliseconds /1000,
                    qtyUsersDeleted: usersToDelet.length,
                    usersDeleted: usersToDelet,
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