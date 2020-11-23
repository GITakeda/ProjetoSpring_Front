import { get, getById, deleteById, post, put } from './DataGenerico';

const type = 'mentor';

export const getMentor = (setValue, errorHandler) => {
    get(type, setValue, errorHandler);
}

export const getByIdMentor = (id, setValue, errorHandler) => {
    getById(type, id, setValue, errorHandler);
}

export const postMentor = (body, successHandler, errorHandler) => {
    post(type, body, successHandler, errorHandler);
}

export const deleteByIdMentor = (id, success, errorHandler) => {
    deleteById(type, id, success, errorHandler);
}

export const putMentor = (body, id, errorHandler) => {
    put(type, body, id, errorHandler);
}