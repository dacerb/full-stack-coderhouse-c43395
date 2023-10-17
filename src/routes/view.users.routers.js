import { Router } from 'express';
import { requiredLoginSession, authToken} from "./utils/utils.js"
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
        style: 'main.css'
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

router.get("/chat", requiredLoginSession, async (req, res) => {
    const sessionUser =  req.session.user;
    const user = await userManager.getUserByEmail(sessionUser.email)
    const userDto = new UsersDto(user)

    return res.render('chat_all_user', {
        style: 'main.css',
        sessionActive: req.session.user ? true : false,
        user: userDto,
        cartId: userDto.cartId
    });
});

export default router;