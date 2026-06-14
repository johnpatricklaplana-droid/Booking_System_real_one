import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { HomePage } from "../pages/CustomerHomePage";
import { Signup } from "../pages/Signup";
import { ProfilePage } from "../pages/Profile";
import { Overview } from "../pages/business/BussinessOverview";
import { Root } from "../Root";
import { Services } from "../pages/business/Services";
import { Customers } from "../pages/business/Customers";
import { Analytics } from "../pages/business/Analytics";
import { Appointments } from "../pages/business/Appointments";
import { CalendarPage } from "../pages/business/CalendarPage";
import { Landing } from "../pages/business/Landing";
import { Reports } from "../pages/business/Reports";

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

export const businessRouter = createBrowserRouter([
    {
        path: 'landing',
        Component: Landing
    },
    {
        path: '/',
        Component: Root,
        children: [
            { index: true, Component: Overview },
            { path: 'services', Component: Services },
            { path: 'customers', Component: Customers },
            { path: 'analytics', Component: Analytics },
            { path: 'appointments', Component: Appointments },
            { path: 'calendar', Component: CalendarPage },
            { path: 'reports', Component: Reports },
        ]
    },
    {
        path: '/signup',
        Component: Signup
    },
    {
        path: '/login',
        Component: Login
    },
]);