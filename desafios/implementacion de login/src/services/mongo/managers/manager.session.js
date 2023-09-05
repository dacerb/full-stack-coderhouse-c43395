import { userModel } from '../models/user.model.js';

class ManagerSession {
    getUserByEmail = async (email) => {
        return userModel.findOne({email: email})
            .then(user => {
                    return user;
                }
            )
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }

    registerNewUser = async (newUser) => {
        return userModel.create({...newUser})
            .then(newUser => {
                    return newUser;
                }
            )
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }

}

export default ManagerSession;