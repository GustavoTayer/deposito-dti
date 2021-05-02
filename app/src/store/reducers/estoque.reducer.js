import {
  CREATE_ESTOQUE_FAILURE,
  CREATE_ESTOQUE_REQUEST,
  CREATE_ESTOQUE_SUCCESS,
  DELETE_ESTOQUE_SUCCESS,
  LOAD_ESTOQUES_FAILURE,
  LOAD_ESTOQUES_REQUEST,
  LOAD_ESTOQUES_SUCCESS,
  LOAD_ESTOQUE_SUCCESS,
  UPDATE_ESTOQUE_FAILURE,
  UPDATE_ESTOQUE_REQUEST,
  UPDATE_ESTOQUE_SUCCESS,
} from "../actions/estoque.action";

const INITIAL_STATE = {
  list: [],
  map: {},
  loading: false,
  createLoading: false,
};

export default function estoqueReducer(state = INITIAL_STATE, action) {
  let map = { ...state.map };
  let list = [...state.list];

  switch (action.type) {
    case LOAD_ESTOQUES_REQUEST:
      return { ...state, loading: true };
    case LOAD_ESTOQUES_FAILURE:
      return { ...INITIAL_STATE };
    case LOAD_ESTOQUES_SUCCESS:
      list = action.response.data.map((it) => it.id);
      action.response.data?.forEach((estoque) => map[estoque.id] = estoque);
      return { ...state, list, map, loading: false };
    case LOAD_ESTOQUE_SUCCESS:
      list.push(action.response.data?.id) 
      map[action.response.data?.id] = action.response.data 
      return {...state, list, map}
    case CREATE_ESTOQUE_REQUEST:
    case UPDATE_ESTOQUE_REQUEST:
      return { ...state, createLoading: true };
    case CREATE_ESTOQUE_FAILURE:
    case UPDATE_ESTOQUE_FAILURE:
      return { ...state, createLoading: false };
    case CREATE_ESTOQUE_SUCCESS:
      list.push(action.response.data.id);
      map[action.response.data.id] = action.response.data;
      return { ...state, createLoading: false, map, list };
    case UPDATE_ESTOQUE_SUCCESS:
      map[action.response.data.id] = action.response.data;
      return {...state, map}
    case DELETE_ESTOQUE_SUCCESS:
       delete map[action.id];
       list = list.filter(it => it !== action.id);   
       return {...state, list, map}
    default:
      return state;
  }
}
