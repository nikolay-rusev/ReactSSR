// move to ES2015 import statements
import "babel-polyfill";
import express from "express";
import {matchRoutes} from "react-router-config";
import proxy from "express-http-proxy"
import Routes from "./client/Routes";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";

const app = express();

// proxy api requests for server
app.use(
    "/api",
    proxy("http://react-ssr-api.herokuapp.com", {
        proxyReqOptDecorator(opts) {
            opts.headers["x-forwarded-host"] = "localhost:3000";
            return opts;
        }
    }));

// serve bundle.js for client
app.use(express.static("public"));

app.get("*",(req,res) => {
    const store = createStore();

    // some logic to init and load data into the store
    const promises = matchRoutes(Routes, req.path).map(({ route }) => {
        return route.loadData ? route.loadData(store) : null; // null does not have loadData function
    });

    // render when all data is retrieved
    Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(req, store, context);

        if(context.notFound) {
            res.status(404);
        }

        res.send(content);
    });
});

app.listen(3000,() => {
    console.log("Listening to port 3000");
});
