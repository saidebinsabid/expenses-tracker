import { createBrowserRouter } from "react-router";
import Register from "../pages/Register";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import PrivateRoute from "../provider/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddExpense from "../pages/DashBoardPages/AddExpense";
import ExpenseList from "../pages/DashBoardPages/ExpenseList";

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
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            {
                index: true,
                element: <AddExpense></AddExpense>
            },
            {
                path: "expense-list",
                element: <ExpenseList></ExpenseList>
            },
        ]
    }
])