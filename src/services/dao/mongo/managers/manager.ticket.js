import { ticketModel } from '../models/ticket.model.js';

class ManagerTicket {
    newPurchase = async (purchase) => {

        console.log(purchase)
        return "KC"

        /*return userModel.findOne({email: email})
            .then(user => {
                    return user;
                }
            )
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });*/
    }

}

export default ManagerTicket;
