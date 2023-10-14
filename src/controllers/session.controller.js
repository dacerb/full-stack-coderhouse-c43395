
// Session Controller
export async function fail_register(req, res) {
    res.status(401).send({error: "Faild to process register!"});
}

export async function fail_login(req, res) {
    return res.status(401).send({error: "Faild to process login!"});
}

export async function logout(req, res) {
    req.session.destroy(error => {
        if (error){
            res.status(500).send({error: "error logout", message: "Error al cerrar la sesion"});
        }
        res.send({message: "Sesion cerrada correctamente."});
    });
}
