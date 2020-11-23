import { get, getById, deleteById, post, put } from './DataGenerico';

const type = 'mentoria';

export const getMentoria = (setValue, errorHandler) => {
    get(type, setValue, errorHandler);
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

export const putMentoria = (body, id, errorHandler) => {
    put(type, body, id, errorHandler);
}