import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import mainReducer from "./Store/Reducers/mainReducer";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {createStore, applyMiddleware, compose} from "redux";
import {persistStore, persistReducer,} from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react'

import storage from 'redux-persist/lib/storage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['socket', 'userName']
  }

const persistedReducer = persistReducer(persistConfig, mainReducer);
const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
  }

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(logger)));
const persistor = persistStore(store);

const app = (
    <Provider store = {store}>
    <PersistGate loading = {null} persistor = {persistor}>
    <BrowserRouter>
        <App current_state = {store.getState()} />
    </BrowserRouter>
    </PersistGate>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.unregister();
