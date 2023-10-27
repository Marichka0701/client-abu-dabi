import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {router} from "./routing/router";
import {store} from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);
