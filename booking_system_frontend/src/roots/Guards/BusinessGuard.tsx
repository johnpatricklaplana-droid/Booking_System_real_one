import { useUser } from "../../provider/UserContext";
import { Root } from "../../Root";
import { CustomerRoot } from "../../customerRoot";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

export function BusinessGuard() {

    const { user } = useUser();
    let path = useLocation().pathname;

    const navigate = useNavigate();

    const page = useMemo(() => {

        if (!user?.activeRole) return;

        if(user.activeRole === "CUSTOMER" && !path.startsWith("/customer")) path = '/customer/home';
        if(user.activeRole === "BUSINESS_OWNER" && !path.startsWith('/business')) path = '/business';

        console.log(path);

        if (user.activeRole === "CUSTOMER" && path.startsWith('/customer')) {
            navigate('/customer/home');
            return <CustomerRoot />
        }

        if (user.activeRole == "BUSINESS_OWNER" && path.startsWith('/business')) {
            navigate('/business');
            return <Root />
        }

    }, [user?.activeRole]);

    return page;

}