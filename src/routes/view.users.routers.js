import { Router } from 'express';
import { requiredLoginSession, authToken, requiredRole } from "./utils/utils.js"
import { userManager } from '../services/factory.js'
import UsersDto from '../services/dto/users.dto.js'
const router = Router();

router.get("/register/", async (req, res)=> {
    return res.render('register', {
        style: 'main.css'
    });
});

router.get("/login/",  async (req, res) => {
    return res.render('login', {
        style: 'home.css'
    });
});

router.get("/", requiredLoginSession, async (req, res) => {
    const sessionUser =  req.session.user;
    const user = await userManager.getUserByEmail(sessionUser.email)
    const userDto = new UsersDto(user)

    return res.render('profile', {
        style: 'main.css',
        sessionActive: req.session.user ? true : false,
        user: userDto,
        cartId: userDto.cartId
    });
});

router.get("/chat", requiredLoginSession, requiredRole(['user'], null), async (req, res) => {
    const sessionUser =  req.session.user;
    const user = await userManager.getUserByEmail(sessionUser.email)
    const userDto = new UsersDto(user)

    return res.render('chat_all_user', {
        style: 'home.css',
        sessionActive: req.session.user ? true : false,
        user: userDto,
        cartId: userDto.cartId
    });
});

router.get("/manage/users", requiredLoginSession, async (req, res) => {
    const sessionUser =  req.session.user;
    const users = await userManager.getAllUsers()

    const usersDTO = users.map(user => {
        return {...new UsersDto(user)}
    })

    console.log(usersDTO)

    return res.render('profile-admin-users', {
        style: 'main.css',
        sessionActive: req.session.user ? true : false,
        user: sessionUser,
        users: usersDTO
    });
});

export default router;