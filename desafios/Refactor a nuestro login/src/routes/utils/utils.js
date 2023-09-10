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