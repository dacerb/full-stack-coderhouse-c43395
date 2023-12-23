import { userManager  } from "../services/factory.js";
import UsersDto from '../services/dto/users.dto.js'

export async function deleteUser(req, res, next) {
    const { logger } = req;
    const allUsers = await userManager.getAllUsers();
    let { limitSeconds } = req.query; // recibo por parametros el limite en segundos
    if (isNaN(limitSeconds)) return res.status(400).send({
            status:'error',
            message: "the limitSeconds must be integer."
        });

    if (!limitSeconds) {
        limitSeconds = 60; //de no recibir el parametro el valor por defecto es..
    }else {
        limitSeconds = parseInt(limitSeconds);
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
            const TimestampUserLastLogin = userLastLogin.getTime() + limitSeconds;

            const elapseTime = parseInt((currentDateTimestamp - TimestampUserLastLogin));

            console.log(TimestampUserLastLogin)
            console.log(currentDateTimestamp)
            console.log(elapseTime)

            if (elapseTime > limitSeconds) return true;

        })

        return res.status(200).send(
                {
                    limitSeconds,
                    qtyUsersDeleted: usersToDelet.length,
                    usersDeleted: usersToDelet

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