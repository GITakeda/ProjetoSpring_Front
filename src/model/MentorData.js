import { get, getById, deleteById, post, put } from './DataGenerico';

const type = 'mentor';

export const getMentor = (setValue, page, size, sort, errorHandler) => {
    get(type, setValue, page, size, sort, errorHandler);
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

export const putMentor = (body, id, successHandler, errorHandler) => {
    put(type, body, id, successHandler, errorHandler);
}