import { Navigate } from "react-router-dom";
import { useUser } from "../provider/UserContext";
import { Root } from "../Root";

export function BusinessGuard () {

    const { user } = useUser();

    if(user?.activeRole !== "BUSINESS_OWNER") { 
        return <Navigate to="/customer/home" replace />
    }

    return <Root />;
}