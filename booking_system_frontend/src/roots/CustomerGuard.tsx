import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../provider/UserContext";

export function CustomerGuard() {

    const { user } = useUser();

    if (user?.activeRole !== "CUSTOMER") {
        return <Navigate to="/business" replace />
    }
    
    return <Outlet />;
}