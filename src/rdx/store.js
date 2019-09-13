import {createStore, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/reducers';

let initialState = {
};

const composeDebbug = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers,initialState,
    composeDebbug(applyMiddleware(thunk)));
//applyMiddleware(thunk) sin debugger