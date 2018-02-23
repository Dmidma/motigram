import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import reducer from './reducers'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom'

const logger = store => next => action => {
        console.group(action.type)
        console.info('dispatching', action)
        let result = next(action)
        console.log('next state', store.getState())
        console.groupEnd(action.type)
        return result
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
        reducer,
        composeEnhancers(
            applyMiddleware(logger)
        )
)


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider> 
    , document.getElementById('root'));

registerServiceWorker();
