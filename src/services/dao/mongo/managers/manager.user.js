import { userModel } from '../models/user.model.js';

class ManagerUser {
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

    getUserByValue = async (value) => {
        return userModel.findOne(value)
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

export default ManagerUser;