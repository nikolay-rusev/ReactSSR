import React from "react";
import App from "./App";
import HomePage from "./pages/HomePage";
import UsersListPage from "./pages/UsersListPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminsListPage from "./pages/AdminsListPage";

// route config for use with react-router-config
export default [
    {
        ...App,
        routes: [
            {
                ...HomePage,
                path: "/",
                exact: true
            },
            {
                ...AdminsListPage,
                path: "/admins"
            },
            {
                ...UsersListPage,
                path: "/users"
            },
            {
                // show when no match, no path needed
                ...NotFoundPage
            }
        ]
    }
];

