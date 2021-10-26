import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import reducers from "../client/reducers";

export default (req) => {
    // auth related code:
    const axiosInstance = axios.create({
        baseURL: "http://react-ssr-api.herokuapp.com",
        // get original cookie and pass it or default ot empty
        headers: {
            cookie: req.get('cookie') || ""
        }
    });

    const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)));

    return store;
}
