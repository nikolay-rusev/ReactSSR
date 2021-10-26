// move to ES2015 import statements
import "babel-polyfill";
import express from "express";
import {matchRoutes} from "react-router-config";
import proxy from "express-http-proxy"
import Routes from "./client/Routes";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";

const app = express();

// proxy api requests
app.use(
    "/api",
    proxy("http://react-ssr-api.herokuapp.com", {
        proxyReqOptDecorator(opts) {
            opts.headers["x-forwarded-host"] = "localhost:3000";
            return opts;
        }
    }));


app.use(express.static("public"));
app.get("*",(req,res)=>{
    const store = createStore(req); // pass req to provide access to cookie

    // some logic to init and load data into the store
    // will return array of promises
    const promises = matchRoutes(Routes, req.path).map(({ route }) => {
        return route.loadData ? route.loadData(store) : null;
    });

    Promise.all(promises).then(() => {
        res.send(renderer(req, store));
    });
});

app.listen(3000,() => {
    console.log("Listening to port 3000");
});
