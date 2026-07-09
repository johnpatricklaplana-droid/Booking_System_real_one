import { CustomerRoot } from "../../customerRoot";
import { useUser } from "../../provider/UserContext";
import { Root } from "../../Root";


export function RoleGuard() {

    const { user } = useUser();

    if (user?.activeRole === "CUSTOMER") {
        return <CustomerRoot />;
    }

    if(user?.activeRole === "BUSINESS_OWNER") {
        return <Root />
    }
    
}