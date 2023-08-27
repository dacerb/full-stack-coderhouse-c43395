import * as UserServices from "../services/usersService.js"

export async function createUser(req, res){
    try {
        const {body} = req;
        const response = await UserServices.createUser(body);
        res.status(200).json(
            {response: response}
        )

    }catch (error) {
        console.error("problemas para recuperar informacion de la base de datos en createUser: ", error);
        res.status(400).json({message: error.message});
    }
};

export async function getAllUsers(req, res) {
    try {
        const response = await UserServices.getAllUsers();
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error.message);
    }
};