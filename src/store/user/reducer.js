import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_USER_LIST,
    GET_STAFF_LIST,
    ADD_NEW_STAFF_TO_LOCAL,
} from './actionTypes';

const INIT_STATE = {
    users: [],
    staffs: [],
    total: 0,
    error: null,
    loading: false,
};

const User = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_USER_LIST:
                    return {
                        ...state,
                        users: action.payload.data.list,
                        total: action.payload.data.total,
                    };

                case GET_STAFF_LIST:
                    return {
                        ...state,
                        staffs: action.payload.data.list,
                        total: action.payload.data.total,
                    };
                default:
                    return state;
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_USER_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_STAFF_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                default:
                    return state;
            }

        case ADD_NEW_STAFF_TO_LOCAL:
            return {
                ...state,
                staffs: [...state.staffs, action.payload],
            };

        default:
            return state;
    }
};

export default User;
