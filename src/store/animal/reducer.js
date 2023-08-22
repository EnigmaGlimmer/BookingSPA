import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_ANIMAL_LIST,
    DELETE_ANIMAL,
    DELETE_ANIMAL_SUCCESS,
    DELETE_ANIMAL_FAILED,
} from './actionType.js';

const INIT_STATE = [
    {
        name: [],
    },
];

const Animal = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_ANIMAL_LIST:
                    return {
                        ...state,
                        name: action.payload.data,
                    };
                default:
                    return false;
            }
        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_ANIMAL_LIST:
                    return {
                        ...state,
                        blogs: action.payload.error,
                    };

                default:
                    return state;
            }

        default:
            return state;
    }
};

export default Animal;
