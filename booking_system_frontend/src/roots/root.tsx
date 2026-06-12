import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { HomePage } from "../pages/CustomerHomePage";
import { Signup } from "../pages/Signup";
import { ProfilePage } from "../pages/Profile";

export const router = createBrowserRouter([
    {
        path: '/login',
        Component: Login
    },
    {
        path: '/home',
        Component: HomePage
    },
    {
        path: '/signup',
        Component: Signup
    },
    {
        path: '/profile',
        Component: ProfilePage
    }
]);