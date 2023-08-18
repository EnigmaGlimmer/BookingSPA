import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_ANIMAL_LIST,
    DELETE_ANIMAL,
    DELETE_ANIMAL_SUCCESS,
    DELETE_ANIMAL_FAILED
} from './actionType.js'

export const getAnimal = (actionType) =>({
    type: GET_ANIMAL_LIST,
    payload: {actionType}
})

export const getSuccess = (actionType,data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: {actionType,data}
})

export const getError = (actionType,error) => ({
    type: API_RESPONSE_ERROR,
    payload: {actionType,error}
})

export const deleteAnimal = () => ({
    type : DELETE_ANIMAL,
    payload:{}
})

export const deleteAnimalSuccess = (data) => ({
    type: DELETE_ANIMAL_SUCCESS,
    payload:{data}
})

export const deleteAnimalFailed = (error) => ({
    type: DELETE_ANIMAL_FAILED,
    payload:{error}
})
