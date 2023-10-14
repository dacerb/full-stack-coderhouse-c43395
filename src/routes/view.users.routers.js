import { Router } from 'express';
import {requiredLoginSession, authToken} from "./utils/utils.js"

const router = Router();

router.get("/register/", async (req, res)=> {
    return res.render('register', {
        style: 'main.css'
    });
});

router.get("/login/",  async (req, res) => {
    return res.render('login', {
        style: 'main.css'
    });
});

router.get("/", requiredLoginSession, async (req, res) => {
    const user =  req.session.user;
    return res.render('profile', {
        style: 'main.css',
        sessionActive: req.session.user ? true : false,
        user
    });
});

export default router;