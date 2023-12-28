import dotenv from "dotenv";

const PRIVATE_KEY = process.env.SECRET_PHRASE

// Carga de variables de entorno
dotenv.config();

export async function  requiredLoginSession(req, res, next){
    const session = await req.session.user;
    if (session) {
        return next();
    } else {
        // Redireccionar al usuario a la página de inicio de sesión
        console.log('Se solicita login porque no hay datos de session: ', session)
        return res.redirect('/users/login');
    }
}

// requiredRole(['admin'])
export function requiredRole(allowedRoles, redirectTo) {
    return (req, res, next) => {
        const session = req.session.user;
        console.log("validando session ", session);
        if (session && session.rol && allowedRoles.includes(session.rol)) {
            // El rol del usuario tiene acceso permitido
            return next();
        } else {
            // El rol del usuario no tiene acceso permitido, redirigir a la URL especificada
            if (redirectTo) {
                return res.redirect(redirectTo);
            } else {
                console.log('DENEGADO')
                return res.status(403).render('access_denied', {
                    style: 'home.css',
                    sessionActive: req.session.user ? true : false,
                    user: req.session.user
                });
            }
        }
    };
}

export const generateJWToken = (data, exp_time) => {
    return jwt.sign({data}, PRIVATE_KEY, {expireIn: exp_time})
}

export const authToken = (req, res, next) => {
    const {logger} = req;
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
