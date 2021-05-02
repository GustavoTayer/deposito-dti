import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import callAPIMiddleware from "../helpers/callAPIMiddleware";
import { composeWithDevTools } from "redux-devtools-extension";


import estoqueReducer from "./reducers/estoque.reducer";


const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware, callAPIMiddleware))

export default createStore(combineReducers({
  estoque: estoqueReducer,
}), composedEnhancer);;
