import { ticketModel } from '../models/ticket.model.js';

class ManagerTicket {
    newPurchase = async (ticket) => {
        return  ticketModel.create(ticket)
            .then(newTicket => {
                return newTicket.toJSON();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

}

export default ManagerTicket;
