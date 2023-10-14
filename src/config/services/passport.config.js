import passport from 'passport';
import passportLocal from 'passport-local';
import GitHubStrategy from 'passport-github2';
import {createHash, isValidPassword, radomString} from "../../common/utils/utils.js";
import { userManager, cartManager  } from "../../services/factory.js";

const localStrategy = passportLocal.Strategy

const initializePassport = () => {

    const GH_CLIENT_ID = process.env.GH_CLIENT_ID;
    const GH_CLIENT_SECRET = process.env.GH_CLIENT_SECRET;
    const GH_CALLBACK_UL = process.env.GH_CALLBACK_UL;

    // GITHUB ESTRATEGIA //
    passport.use('github', new GitHubStrategy(
        {
            clientID: GH_CLIENT_ID,
            clientSecret: GH_CLIENT_SECRET,
            callbackUrl: GH_CALLBACK_UL
        },
        async (accessToken, refreshToken, profile, done) => {

            try {
                const foundUser = await  userManager.getUserByEmail(profile._json.email);
                if(!foundUser) {
                    console.warn("usuario in existente: ", profile._json.email)
                    const passwordRamdom = radomString(20);
                    const newUser = {
                        first_name: profile._json.name,
                        last_name: 'incomplete',
                        email: profile._json.email,
                        age: 0,
                        password: createHash(passwordRamdom),
                        registerBy: 'GitHub'
                    }

                    const result = await userManager.registerNewUser(newUser);
                    done(null, result)
                } else {
                    return done(null, foundUser)
                }


            }catch (error) {
                console.error(error)
                return done(error)
            }
        }));


    // LOCAL ESTRATEGIA //
    // register
    passport.use('register', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done) => {
            // logica...
            const { first_name, last_name, email, age, password: inputPassword } = req.body;
            try {

                const userExist = await  userManager.getUserByEmail(email);
                if (userExist) return done(null, false, { message: "User already exists" });

                const newCart = await cartManager.createCart();
                console.log(newCart)
                console.log(newCart._id)
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(inputPassword),
                    registerBy: 'local',
                    cartId: newCart._id
                }

                const newUserRegistered =  await userManager.registerNewUser(newUser)
                return done(null, newUserRegistered)

            } catch (error) {
                console.error(error)
                return done(error)
            }
        }
    ));

    // login
    passport.use('login', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done) => {
            // logica...
            try {
                const email = username;
                const inputPassword = password;
                const foundUser = await  userManager.getUserByEmail(email);

                if (!foundUser) return done(null, false);
                if (!isValidPassword(foundUser, inputPassword))  return done(null, false, { message: "incorrect login" });
                return done(null, foundUser)

            } catch (error) {
                console.error(error)
                return done(error)
            }
        }
    ));

    // Funciones de Almacenamiento y recuepracion de datos Serializacion y desserializacion...
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser( async (id, done) => {
        try {
            let user = await userManager.getUserByValue(id)
            done(null, user)
        }catch (error) {
            console.error(error)
        }
    });

}

export default initializePassport;