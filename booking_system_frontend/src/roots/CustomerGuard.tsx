import { Navigate } from "react-router-dom";
import { useUser } from "../provider/UserContext";
import { Root } from "../Root";
import { CustomerRoot } from "../customerRoot";

export function CustomerGuard() {

    const { user, loading } = useUser();

    if (loading) {
        return <div className="flex h-screen w-screen bg-(--bg) justify-center items-center">
            <h1 className="text-(--text-1)">Loading please super wait</h1>
        </div>
    }

    if (user?.activeRole !== "CUSTOMER") {
        return <Navigate to="/business" replace />
    }
    
    return <CustomerRoot />;
}