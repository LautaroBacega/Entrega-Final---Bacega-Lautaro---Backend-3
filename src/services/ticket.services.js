import TicketDao from "../Daos/ticket.dao.js";

const ticketDao = new TicketDao();


export const getTickets = async () => {
    try {
        return await ticketDao.getTickets();
    } catch (error) {        
        console.log(error);
    }
}

export const createTicket = async (ticket) => {
    try {
        return await ticketDao.createTicket(ticket);
    } catch (error) {
        console.log(error);
    }
}

