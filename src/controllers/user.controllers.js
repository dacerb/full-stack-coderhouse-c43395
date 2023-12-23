import { userManager  } from "../services/factory.js";
import UsersDto from '../services/dto/users.dto.js'

export async function deleteUser(req, res, next) {
    return res.send(
        {
            message: "hola deleteUser"
        }
    );
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