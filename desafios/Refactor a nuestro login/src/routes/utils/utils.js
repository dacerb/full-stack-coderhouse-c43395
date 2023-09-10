import dotenv from "dotenv";

const PRIVATE_KEY = process.env.SECRET_PHRASE

// Carga de variables de entorno
dotenv.config();

export function requiredLoginSession(req, res, next){
    const session = req.session.user;
    if (session) {
        return next();
    } else {
        // Redireccionar al usuario a la página de inicio de sesión
        // Es posible que despues de logiar con github no se levante la session tan rapido?
        console.log('Se solicita login porque no hay datos de session: ', session)
        return res.redirect('/users/login');
    }
}


export const generateJWToken = (data, exp_time) => {
    return jwt.sign({data}, PRIVATE_KEY, {expireIn: exp_time})
}

export const authToken = (req, res, next) => {
    const authHeader = req.header.authorization;
    console.log(authHeader);
    if (!authHeader) return res.status(401).send({error: "User not authenticated or missing token."})

    const token = authHeader.split(' ')[1];
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({error: "Token ivalid, Unauthorized!"})
        req.user = credentials.user;
        console.log(req.user);
        next();
    })
}
