
// RENDER VIEW FRONT
export async function register(req, res) {
    return res.render('register', {
        style: 'main.css'
    });
}

export async function login(req, res) {
    return res.render('login', {
        style: 'main.css'
    });
}

export async function profile(req, res) {
    const user =  req.session.user;
    return res.render('profile', {
        style: 'main.css',
        sessionActive: req.session.user ? true : false,
        user
    });
}
