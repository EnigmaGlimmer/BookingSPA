import { postCustomer, searchCustomer } from '..';

const { APIClient } = require('../api_helper');
const url = require('../url_helper');

const api = new APIClient();

export const postBooking = (body) => {
    return api.create(url.POST_BOOKING, body);
};

export const assignBooking = (customer, booking) => {
    return postCustomer(customer)
        .then((response) => {
            if (!!response.data.errors) {
                return searchCustomer({
                    email: customer?.customerEmail,
                });
            }

            return response;
        })
        .then((newCustomer) => {
            const submitBooking = {
                ...booking,
                customerId: newCustomer.customerId,
            };

            return postBooking(submitBooking);
        });
};
