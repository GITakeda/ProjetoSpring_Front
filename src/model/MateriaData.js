import { get, getById, deleteById, post, put } from './DataGenerico';

const type = 'materia';

export const getMateria = (setValue, errorHandler) => {
    get(type, setValue, errorHandler);
}

export const getByIdMateria = (id, setValue, errorHandler) => {
    getById(type, id, setValue, errorHandler);
}

export const postMateria = (body, successHandler, errorHandler) => {
    post(type, body, successHandler, errorHandler);
}

export const deleteByIdMateria = (id, success, errorHandler) => {
    deleteById(type, id, success, errorHandler);
}

export const putMateria = (body, id, successHandler, errorHandler) => {
    put(type, body, id, successHandler, errorHandler);
}