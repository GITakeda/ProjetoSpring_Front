import React, {createContext} from 'react';
import httpService from '../services/httpService'

export function get(type, setValue, errorHandler){
    httpService.get(`/${type}`).then(({data}) => {
        setValue(data);
    })
    .catch(error => {errorHandler(error)});
}

export function getById(type, id, setValue, errorHandler){
    httpService.get(`/${type}/${id}`).then(({data}) => {
        setValue(data);
    })
    .catch(error => {errorHandler(error)});
}

export function post(type, body, successHandler, errorHandler){
    httpService.post(`/${type}/post`, body).then(({data}) => {
        successHandler();
    })
    .catch(error => {errorHandler(error)});
}

export function deleteById(type, id, success, errorHandler){
    httpService.delete(`/${type}/${id}`).then(({data}) => {
        success();
    })
    .catch(error => {errorHandler(error)});
}

export function put(type, body, id, successHandler, errorHandler){
    httpService.put(`/${type}/${id}`, body).then(({data}) => {
        successHandler();
    })
    .catch(error => {errorHandler(error)});
}
