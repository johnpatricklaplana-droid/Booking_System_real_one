import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { Overview } from "../pages/business/BussinessOverview";
import { Services } from "../pages/business/Services";
import { Customers } from "../pages/business/Customers";
import { Analytics } from "../pages/business/Analytics";
import { Appointments } from "../pages/business/Appointments";
import { CalendarPage } from "../pages/business/CalendarPage";
import { Landing } from "../pages/business/Landing";
import { Reports } from "../pages/business/Reports";
import { BusinessOnboardingWizard } from "../pages/BusinessRegistrationPage";
import { BusinessGuard } from "./BusinessGuad";
import { Settings } from "../pages/business/Settings";
import { HomePage } from "../pages/CustomerHomePage";
import { CustomerGuard } from "./CustomerGuard";
import ServiceForm from "../pages/business/AddServices";
import JobsPage from "../pages/FindJobs";
import { ProfilePage } from "../pages/Profile";
import BusinessProfilePage from "../pages/business/BusinessProfile";
import StaffManagementPage from "../pages/business/Staff";
import { ExploreServices } from "../pages/ExploreServices";
import { ServiceDetails } from "../pages/ServiceDetails";

export const router = createBrowserRouter([
    { path: 'landing', Component: Landing },
    { path: '/login', Component: Login },
    { path: '/signup', Component: Signup },

    {
        path: '/customer',
        Component: CustomerGuard,
        children: [
            { path: 'home', Component: HomePage },
            { path: 'profile', Component: ProfilePage },
            { path: 'create-business', Component: BusinessOnboardingWizard },
            { path: 'jobs', Component: JobsPage },
            { path: 'explore', Component: ExploreServices },
            { path: 'service/:serviceId', Component: ServiceDetails }
        ]
    },

    {
        path: '/business',
        Component: BusinessGuard,
        children: [
            { index: true, Component: Overview },
            { path: 'services', Component: Services },
            { path: 'add-services', Component: ServiceForm },
            { path: 'customers', Component: Customers },
            { path: 'analytics', Component: Analytics },
            { path: 'appointments', Component: Appointments },
            { path: 'calendar', Component: CalendarPage },
            { path: 'reports', Component: Reports },
            { path: 'settings', Component: Settings },
            { path: 'profile', Component: BusinessProfilePage },
            { path: 'staff', Component: StaffManagementPage },
        ]
    },
]);
