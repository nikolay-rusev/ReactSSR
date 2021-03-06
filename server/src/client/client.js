// Startup point for the client-side app
import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {renderRoutes} from "react-router-config";
import axios from "axios";
import Routes from "./Routes";
import reducers from "./reducers";

// needed for api req (auth handling on server)
const axiosInstance = axios.create({
    baseURL: "/api"
})

// request to /api/users
// axiosInstance.get("/users");

// window.INITIAL_STATE: sync client/server state
const store = createStore(reducers, window.INITIAL_STATE, applyMiddleware(thunk.withExtraArgument(axiosInstance)));

// state rehydration on the browser
ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <div>{renderRoutes(Routes)}</div>
        </BrowserRouter>
    </Provider>,
    document.querySelector("#root")
);

