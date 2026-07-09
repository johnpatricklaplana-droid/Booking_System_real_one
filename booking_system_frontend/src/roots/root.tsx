import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { Services } from "../pages/business/Services";
import { Customers } from "../pages/business/Customers";
import { Analytics } from "../pages/business/Analytics";
import { Appointments } from "../pages/business/Appointments";
import { Landing } from "../pages/business/Landing";
import { BusinessOnboardingWizard } from "../pages/BusinessRegistrationPage";
import { BusinessGuard } from "./BusinessGuad";
import { Settings } from "../pages/business/Settings";
import { HomePage } from "../pages/CustomerHomePage";
import { CustomerGuard } from "./CustomerGuard";
import ServiceForm from "../pages/business/AddServices";
import { ProfilePage } from "../pages/Profile";
import BusinessProfilePage from "../pages/business/BusinessProfile";
import StaffManagementPage from "../pages/business/Staff";
import { ExploreServices } from "../pages/ExploreServices";
import { ServiceDetails } from "../pages/ServiceDetails";
import MyBookingsPage from "../pages/MyBookings";
import { RoleGuard } from "./Guards/RoleGuard";

export const router = createBrowserRouter([
    { path: 'landing', Component: Landing },
    { path: '/login', Component: Login },
    { path: '/signup', Component: Signup },
    { path: 'create-business', Component: BusinessOnboardingWizard },

    {
        path: '/customer',
        Component: RoleGuard,
        children: [
            { path: 'home', Component: HomePage },
            { path: 'profile', Component: ProfilePage },
            { path: 'explore', Component: ExploreServices },
            { path: 'service/:serviceId', Component: ServiceDetails },
            { path: 'bookings', Component: MyBookingsPage }
        ]
    },

    {
        path: '/business',
        Component: RoleGuard,
        children: [
            { index: true, Component: Analytics },
            { path: 'services', Component: Services },
            { path: 'add-services', Component: ServiceForm },
            { path: 'customers', Component: Customers },
            { path: 'appointments', Component: Appointments },
            { path: 'settings', Component: Settings },
            { path: 'profile', Component: BusinessProfilePage },
            { path: 'staff', Component: StaffManagementPage },
        ]
    },
]);
