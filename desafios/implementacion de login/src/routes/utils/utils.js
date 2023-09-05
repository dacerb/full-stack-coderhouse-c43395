export function requiredLoginSession(req, res, next){
    if (req.session.user) {
        return next();
    } else {
        // Redireccionar al usuario a la página de inicio de sesión
        return res.redirect('/users/login');
    }
}