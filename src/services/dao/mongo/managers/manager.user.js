import { userModel } from '../models/user.model.js';
import {productModel} from "../models/product.model.js";
import _ from "mongoose-paginate-v2";

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

    setLastLogin = async  (userId) => {
        const currentDateTime = new Date();

        userModel.findByIdAndUpdate({_id: userId}, {
            lastLogin:  currentDateTime
        }).then(userUpdatedLastLogin => {
            return userUpdatedLastLogin;
        }).catch(error => {
            console.error('Error:', error);
        });
    }

    getAllUsers = async  () => {
        return userModel.find()
            .then(users => {
                return users
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }

    deleteUserById = async (_id) => {

        return userModel.deleteOne({_id})
            .then(userDeleted => {
                    return Boolean(userDeleted.deletedCount)
                }
            )
            .catch(error => {
                console.error('Error:', error);
            });
    }

    getUserById = async (id) => {

        return userModel.findOne({_id: id})
            .then(user => {
                    if (user) return user.toJSON();
                    return user;
                }
            )
            .catch(error => {
                console.error('Error:', error);
            });
    }

    updateUserRolById = async ({_id, rol}) => {
        return userModel.findByIdAndUpdate(_id, {
            rol
        }, { new: true })
            .then(userUpdated => {
                    return userUpdated;
                }
            )
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

export default ManagerUser;