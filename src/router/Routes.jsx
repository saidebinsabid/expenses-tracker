import { createBrowserRouter } from "react-router";
import Register from "../pages/Register";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";

export const router = createBrowserRouter([
    {
        path: "/auth",
        element: <AuthLayout></AuthLayout>,
        children:[
            {
                path: '/auth/login',
                element: <Login></Login>
            },
            {
                path: '/auth/register',
                element: <Register></Register>
            }
        ]
    }
])