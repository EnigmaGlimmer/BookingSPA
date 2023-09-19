import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_SERVICE_LIST,
    PUT_SERVICE_SUCCESS,
    PUT_SERVICE_FAILED,
} from './actionType';

const INIT_STATE = {
    assign: [],
    error: null,
    loading: false,
};

const Assign = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_SERVICE_LIST:
                    return {
                        ...state,
                        assign: action.payload.data,
                    };

                default:
                    return state;
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_SERVICE_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                default:
                    return state;
            }
        case PUT_SERVICE_SUCCESS:
            return {
                ...state,
                assign: action.payload.data,
            };
        case PUT_SERVICE_FAILED:
            return {
                ...state,
                errors: action.payload.error,
            };
        default:
            return state;
    }
};

export default Assign;
