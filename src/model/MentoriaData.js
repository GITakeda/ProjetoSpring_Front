import { get, getById, deleteById, post, put } from './DataGenerico';

const type = 'mentoria';

export const getMentoria = (setValue, page, size, sort, errorHandler) => {
    get(type, setValue, page, size, sort, errorHandler);
}

export const getByIdMentoria = (id, setValue, errorHandler) => {
    getById(type, id, setValue, errorHandler);
}

export const postMentoria = (body, successHandler, errorHandler) => {
    post(type, body, successHandler, errorHandler);
}

export const deleteByIdMentoria = (id, success, errorHandler) => {
    deleteById(type, id, success, errorHandler);
}

export const putMentoria = (body, id, successHandler, errorHandler) => {
    put(type, body, id, successHandler, errorHandler);
}