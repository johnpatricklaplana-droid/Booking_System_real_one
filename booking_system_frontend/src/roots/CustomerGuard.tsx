import { Navigate } from "react-router-dom";
import { useUser } from "../provider/UserContext";
import { CustomerRoot } from "../customerRoot";

export function CustomerGuard() {

    const { user } = useUser();

    if (user?.activeRole !== "CUSTOMER") {
        return <Navigate to="/business" replace />
    }
    
    return <CustomerRoot />;
}