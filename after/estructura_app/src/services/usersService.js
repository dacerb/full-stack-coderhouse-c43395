import {userModel} from "../models/usersModels.js";


export async function createUser(data){
    try {
        const response = await userModel.create(data);
        return response;
    }catch (error) {
        throw new Error(error);
    }
};
export async function getAllUsers() {
    try {
        const response = await userModel.find({});
        return response;
    } catch (error) {
        throw new Error(error)
    }
}