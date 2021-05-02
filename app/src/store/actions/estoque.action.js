import { API } from "../../helpers/api";

export const LOAD_ESTOQUES_SUCCESS = 'LOAD_ESTOQUES_SUCCESS';
export const LOAD_ESTOQUES_REQUEST = 'LOAD_ESTOQUES_REQUEST';
export const LOAD_ESTOQUES_FAILURE = 'LOAD_ESTOQUES_FAILURE';

export const LOAD_ESTOQUE_SUCCESS = 'LOAD_ESTOQUE_SUCCESS';
export const LOAD_ESTOQUE_REQUEST = 'LOAD_ESTOQUE_REQUEST';
export const LOAD_ESTOQUE_FAILURE = 'LOAD_ESTOQUE_FAILURE';

export const CREATE_ESTOQUE_SUCCESS = 'CREATE_ESTOQUE_SUCCESS';
export const CREATE_ESTOQUE_REQUEST = 'CREATE_ESTOQUE_REQUEST';
export const CREATE_ESTOQUE_FAILURE = 'CREATE_ESTOQUE_FAILURE';

export const UPDATE_ESTOQUE_SUCCESS = 'UPDATE_ESTOQUE_SUCCESS';
export const UPDATE_ESTOQUE_REQUEST = 'UPDATE_ESTOQUE_REQUEST';
export const UPDATE_ESTOQUE_FAILURE = 'UPDATE_ESTOQUE_FAILURE';

export const DELETE_ESTOQUE_SUCCESS = 'DELETE_ESTOQUE_SUCCESS';
export const DELETE_ESTOQUE_REQUEST = 'DELETE_ESTOQUE_REQUEST';
export const DELETE_ESTOQUE_FAILURE = 'DELETE_ESTOQUE_FAILURE';

const apiBaseUrlEstoque = 'estoque';

export function buscarEstoques(params) {
  return {
    types: [LOAD_ESTOQUES_REQUEST, LOAD_ESTOQUES_SUCCESS, LOAD_ESTOQUES_FAILURE],
    shouldCallAPI: () => true,
    callAPI: () => API.get(apiBaseUrlEstoque, {params}),
    payload: {},
  }
}

export function buscarEstoque(id) {
  return {
    types: [LOAD_ESTOQUE_REQUEST, LOAD_ESTOQUE_SUCCESS, LOAD_ESTOQUE_FAILURE],
    shouldCallAPI: (state) => !state.estoque.map[id],
    callAPI: () => API.get(`${apiBaseUrlEstoque}/${id}`),
    payload: {},
  }
}

export function criarEstoque(estoque) {
  return {
    types: [CREATE_ESTOQUE_REQUEST, CREATE_ESTOQUE_SUCCESS, CREATE_ESTOQUE_FAILURE],
    shouldCallAPI: (state) => true,
    callAPI: () => API.post(apiBaseUrlEstoque, estoque),
    payload: {},
  }
}

export function atualizarEstoque(id, estoque) {
  return {
    types: [UPDATE_ESTOQUE_REQUEST, UPDATE_ESTOQUE_SUCCESS, UPDATE_ESTOQUE_FAILURE],
    shouldCallAPI: () => true,
    callAPI: () => API.put(`${apiBaseUrlEstoque}/${id}`, estoque),
    payload: {},
  }
}

export function deletarEstoque(id) {
  return {
    types: [DELETE_ESTOQUE_REQUEST, DELETE_ESTOQUE_SUCCESS, DELETE_ESTOQUE_FAILURE],
    shouldCallAPI: () => true,
    callAPI: () => API.delete(`${apiBaseUrlEstoque}/${id}`),
    payload: {id},
  }
}