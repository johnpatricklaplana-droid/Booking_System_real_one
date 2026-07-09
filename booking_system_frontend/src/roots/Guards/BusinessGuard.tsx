import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../provider/UserContext";

export function BusinessGuard() {

    const { user } = useUser();

    if (user?.activeRole !== "BUSINESS_OWNER") {
        return <Navigate to="/customer/home" replace />
    }

    return <Outlet />;
}