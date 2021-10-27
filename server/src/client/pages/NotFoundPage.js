import React from "react";

// default staticContext to {}, because it is not available in browser
const NotFoundPage = ({ staticContext = {} }) => {
    staticContext.notFound = true;
    return <h1>Ooops, route not found.</h1>;
}

export default {
    component: NotFoundPage
}