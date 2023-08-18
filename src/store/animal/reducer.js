import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_ANIMAL_LIST,
    DELETE_ANIMAL,
    DELETE_ANIMAL_SUCCESS,
    DELETE_ANIMAL_FAILED
} from './actionType.js';

const INIT_STATE = [{
    name: '',
    slug:'',
    url:''
}]

const Animal = (state = INIT_STATE,action) => {
    switch (action.type){
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType)
    }
}