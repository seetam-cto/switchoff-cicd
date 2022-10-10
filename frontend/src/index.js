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
        {/* <script
        type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtB0H3LUpHoVHg1QGlSoEonWjcesiXUR0&libraries=places"
        /> */}
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);