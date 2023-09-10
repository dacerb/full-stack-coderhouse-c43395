import passport from 'passport';
import passportLocal from 'passport-local';
import userModel from '../dao/selectedSessionDb.js'
import {createHash, isValidPassword} from "../common/utils/utils.js";
import sessionManager from "../dao/selectedSessionDb.js";

const localStrategy = passportLocal.Strategy

const initializePassport = () => {
    // ESTRATEGIAS //

    // register
    passport.use('register', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done) => {
            // logica...
            const { first_name, last_name, email, age, password: inputPassword } = req.body;
            try {
                const userExist = await  sessionManager.getUserByEmail(email);
                if (userExist) return done(null, false, { message: "User already exists" });
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(inputPassword)
                }

                const newUserRegistered =  await sessionManager.registerNewUser(newUser)
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
                const foundUser = await  sessionManager.getUserByEmail(email);

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
            let user = await sessionManager.getUserByValue(id)
            return done(null, user)
        }catch (error) {
            console.error(error)
            throw error;
        }
    });

}

export default initializePassport;