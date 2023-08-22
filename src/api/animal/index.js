const { APIClient } = require('../api_helper');
const url = require('../url_helper');

const api = new APIClient();

export const getAnimalList = (request, config) => {
    return api.get(url.GET_ANIMAL_LIST);
};
