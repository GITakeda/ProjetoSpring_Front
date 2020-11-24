import { get, getById, deleteById, post, put } from './DataGenerico';

const type = 'aluno';

export const getAluno = (setValue, errorHandler) => {
    get(type, setValue, errorHandler);
}

export const getByIdAluno = (id, setValue, errorHandler) => {
    getById(type, id, setValue, errorHandler);
}

export const postAluno = (body, successHandler, errorHandler) => {
    post(type, body, successHandler, errorHandler);
}

export const deleteByIdAluno = (id, success, errorHandler) => {
    deleteById(type, id, success, errorHandler);
}

export const putAluno = (body, id, successHandler, errorHandler) => {
    put(type, body, id, successHandler, errorHandler);
}