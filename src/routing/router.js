import {createBrowserRouter, Navigate} from "react-router-dom";

import {MAIN_ROUTES} from "./main_routes";
import MainLayout from "../layouts/MainLayout/MainLayout";
import LoginPage from "../pages/LoginPage/LoginPage";

const user = localStorage.getItem("token");

export const router = createBrowserRouter([
    {
        index: true,
        element: user ? <Navigate to={MAIN_ROUTES.LIVE_TRACKING}/> : <Navigate to={MAIN_ROUTES.LOGIN}/>
    },
    {
        path: MAIN_ROUTES.LIVE_TRACKING,
        element: user ? <MainLayout /> : <Navigate to={MAIN_ROUTES.LOGIN} />,
    },
    {
        path: MAIN_ROUTES.LOGIN,
        element: <LoginPage/>,
    }
]);