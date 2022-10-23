import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// import from react-redux and redux
import {configureStore} from "@reduxjs/toolkit"
import {Provider} from "react-redux"
import rootReducer from './reducers';

// create redux store
const store = configureStore({reducer: rootReducer})

// provide redux store to the internal app 

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);