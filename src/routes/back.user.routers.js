import { Router } from 'express';
import * as SessionController from "../controllers/session.controller.js";
import passport from "passport";

const router = Router();

router.post(
    "/register/",
    passport.authenticate('register', {failureRedirect: '/api/sessions/fail-register'}),
    async (req, res) => {

    res.status(201).send({
            status: "success",
            message: "Usuario creado con exito."
        });
});


router.post(
    "/login/",
    passport.authenticate('login', {failureRedirect: '/api/sessions/fail-login'}),
    async (req, res) => {
        const user = req.user;

        console.log(user)

        if (!user) return res.status(401).send({status: "error", message: "Autenticacion Invalida."});
        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            rol: user.rol,
            cartId: user.cartId
        }
        res.status(200).send({status: "success", payload: req.session.user, message: "¡Primer login!"});
});


router.post("/logout/", SessionController.logout);

router.get("/fail-register/", SessionController.fail_register);

router.get("/fail-login/", SessionController.fail_login);

router.get(
    '/github',
    passport.authenticate('github', {scope: ['user:email']}),
    async (req, res) => {

    });


router.get(
    '/github-callback',
    passport.authenticate('github', {failureRedirect: '/github/error'}),
    async (req, res) => {
        const user = req.user;
        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            rol: user.rol,
            cartId: user.cartId
        };

        req.session.admin = true;

        res.redirect('/products')
    });

export default router;