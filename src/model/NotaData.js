import { get, getById, deleteById, post, put } from './DataGenerico';

const type = 'nota';

export const getNota = (setValue, errorHandler) => {
    get(type, setValue, errorHandler);
}

export const getByIdNota = (id, setValue, errorHandler) => {
    getById(type, id, setValue, errorHandler);
}

export const postNota = (body, successHandler, errorHandler) => {
    post(type, body, successHandler, errorHandler);
}

export const deleteByIdNota = (id, success, errorHandler) => {
    deleteById(type, id, success, errorHandler);
}

export const putNota = (body, id, successHandler, errorHandler) => {
    put(type, body, id, successHandler, errorHandler);
}