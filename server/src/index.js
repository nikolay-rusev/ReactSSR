// move to ES2015 import statements
import "babel-polyfill";
import express from "express";
import {matchRoutes} from "react-router-config";
import Routes from "./client/Routes";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";

const app = express();

app.use(express.static("public"));
app.get("*",(req,res)=>{
    const store = createStore();

    // some logic to init and load data into the store
    matchRoutes(Routes, req.path).map(({ route }) => {
        return route.loadData ? route.loadData() : null;
    });


    res.send(renderer(req, store));
});

app.listen(3000,() => {
    console.log("Listening to port 3000");
});
