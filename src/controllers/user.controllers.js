
export async function deleteUser(req, res, next) {
    return res.send(
        {
            message: "hola deleteUser"
        }
    );
}

export async function getAllUsers(req, res, next) {
    return res.send(
        {
            message: "hola getAllUsers"
        }
    );
}

export async function getUserById(req, res, next) {
    return res.send(
        {
            message: "hola getUserById"
        }
    );
}