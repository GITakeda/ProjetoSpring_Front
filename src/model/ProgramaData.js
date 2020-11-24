import { get, getById, deleteById, post, put } from './DataGenerico';

const type = 'programa';

export const getPrograma = (setValue, errorHandler) => {
    get(type, setValue, errorHandler);
}

export const getByIdPrograma = (id, setValue, errorHandler) => {
    getById(type, id, setValue, errorHandler);
}

export const postPrograma = (body, successHandler, errorHandler) => {
    post(type, body, successHandler, errorHandler);
}

export const deleteByIdPrograma = (id, success, errorHandler) => {
    deleteById(type, id, success, errorHandler);
}

export const putPrograma = (body, id, successHandler, errorHandler) => {
    put(type, body, id, successHandler, errorHandler);
}