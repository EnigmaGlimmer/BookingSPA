import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_CUSTOMER,
    POST_CUSTOMER,
    POST_CUSTOMER_SUCCESS,
    POST_CUSTOMER_FAILED,
    PUT_CUSTOMER,
    PUT_CUSTOMER_SUCCESS,
    PUT_CUSTOMER_FAILED,
    DELETE_CUSTOMER,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_FAILED,
} from './actionType';

const INIT_STATE = {
    customer: [],
    new: null,
    error: null,
    loading: false,
};

const Customer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_CUSTOMER:
                    return {
                        ...state,
                        customer: action.payload.data,
                    };

                default:
                    return state;
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_CUSTOMER:
                    return {
                        ...state,
                        customer: action.payload.data,
                    };

                default:
                    return state;
            }
        case POST_CUSTOMER_SUCCESS:
            return {
                ...state,
                customer: [...state.customer, action.payload.asset],
                new: action.payload.asset,
            };
        case POST_CUSTOMER_FAILED:
            return {
                ...state,
                error: action.payload.error,
            };
        case PUT_CUSTOMER_SUCCESS:
            return {
                ...state,
                customer: action.payload.data,
            };
        case PUT_CUSTOMER_FAILED:
            return {
                ...state,
                customer: action.payload.data,
            };
        default:
            return state;
    }
};

export default Customer;
