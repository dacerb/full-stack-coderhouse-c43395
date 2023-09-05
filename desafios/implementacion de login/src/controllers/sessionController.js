import sessionManager from "../dao/selectedSessionDb.js";

// Session Controller
export async function register(req, res) {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const userExist = await  sessionManager.getUserByEmail(email);
        if (!userExist) {
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password
            }
            const newUserRegistered =  await sessionManager.registerNewUser(newUser)
            return res.status(201).send({
                message: "user are registered",
                user_data: {
                    first_name,
                    last_name,
                    email,
                    age
                }
            })
        }
        return res.send({
            message: "user already exist"
        });
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    try {
        const foundUser = await  sessionManager.getUserByEmail(email);
        if (foundUser) {
            const {first_name, last_name, email, age, password} = foundUser

            console.log(password)

            return res.status(200).send({
                message: "login succeed",
                user_data: {
                    first_name,
                    last_name,
                    email,
                    age
                }
            })
        }
        return res.status(404).send({
            message: "user not exist exist"
        });
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
}

export async function logout(req, res) {
    return res.send({
        message: "cosis logout"
    });
}

export async function profile(req, res) {
    return res.send({
        message: "cosis profile"
    });
}
