import { postCustomer } from '..';

const { APIClient } = require('../api_helper');
const url = require('../url_helper');

const api = new APIClient();

export const postBooking = (body) => {
    return api.create(url.POST_BOOKING, body);
};

export const assignBooking = (customer, booking) => {
    return Promise.all([postBooking(booking), postCustomer(customer)]).then((response) => {
        console.log(response);
        return api.put(url.ASSIGN_BOOKING_CUSTOMER, {
            customerId: response.customerId,
            customerEmai: response.customerEmail,
            bookingId: response.bookingId,
        });
    });
};
