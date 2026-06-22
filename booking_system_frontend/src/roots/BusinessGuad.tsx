import { Navigate } from "react-router-dom";
import { useUser } from "../provider/UserContext";
import { Root } from "../Root";

export function BusinessGuard () {

    const { user, loading } = useUser();

    console.log("Guard render", { activeRole: user?.activeRole, loading });

    if(loading) {
        return <div className="flex h-screen w-screen bg-(--bg) justify-center items-center">
            <h1 className="text-(--text-1)">Loading please super wait</h1>
        </div>
    }

    if(user?.activeRole !== "BUSINESS_OWNER") { 
        return <Navigate to="/customer/home" replace />
    }

    return <Root />;
}