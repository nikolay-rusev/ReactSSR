// move to ES2015 import statements
import "babel-polyfill";
import express from "express";
import {matchRoutes} from "react-router-config";
import proxy from "express-http-proxy"
import Routes from "./client/Routes";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";

const app = express();

// proxy api requests for auth purposes: auth handling
app.use(
    "/api",
    proxy("http://react-ssr-api.herokuapp.com", {
        proxyReqOptDecorator(opts) {
            opts.headers["x-forwarded-host"] = "localhost:3000";
            return opts;
        }
    }));


app.use(express.static("public"));
app.get("*",(req,res) => {
    const store = createStore(req); // pass req to provide access to cookie

    // some logic to init and load data into the store
    // will return array of promises
    const promises = matchRoutes(Routes, req.path).map(({ route }) => {
        return route.loadData ? route.loadData(store) : null; // null does not have loadData function
    }).map(promise => {
        if(promise) {
            return new Promise((resolve, reject) => {
                promise.then(resolve).catch(resolve);
            })
        }
    });

    // Need some way to detect when all initial data load action creators are completed on server
    // render when all data is retrieved
    Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(req, store, context);

        // redirect on server
        if(context.url) {
            return res.redirect(301, context.url);
        }

        if(context.notFound) {
            res.status(404);
        }

        res.send(content);
    });
});

app.listen(3000,() => {
    console.log("Listening to port 3000");
});
