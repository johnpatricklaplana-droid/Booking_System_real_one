import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { get } from "../api/api";
import type { Business } from "../interfaces/Types";
import DaddysHomeLoader from "../components/MainLoadingScreen";
import { useNavigate } from "react-router-dom";

interface User {
    firstName: string;
    lastName: string;
    profilePic: string | null;
    roles: string[];
    addres: string | null;
    phone: string | null;
    email: string;
    activeRole: string;
    lastBusinessIdImViewing: string;
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    business: Business[] | null;
    setBusiness: React.Dispatch<React.SetStateAction<Business[] | null>>;
    activeBusiness: Business | null;
    setActiveBusiness: React.Dispatch<React.SetStateAction<Business | null>>;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider ({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [business, setBusiness] = useState<Business[] | null>([]);
    const [activeBusiness, setActiveBusiness] = useState<Business | null>(null);

    useEffect(() => {
        const getUser = async () => {

            const url = "http://localhost:8080/api/super-me";

            const userResult = await get(url);

            if (userResult.status === 200) {
                setUser({
                    profilePic: userResult.message.avatarUrl,
                    firstName: userResult.message.firstName,
                    lastName: userResult.message.lastName,
                    roles: userResult.message.roles,
                    email: userResult.message.email,
                    addres: null,
                    phone: null,
                    activeRole: userResult.message.lastActiveRole,
                    lastBusinessIdImViewing: userResult.message.lastBusinessIdImViewing
                });
                setLoading(false);
            }

            if (userResult.message.roles.includes("BUSINESS_OWNER")) {
                const url = "http://localhost:8080/api/business";

                const businessResult: Business[] = await get(url);

                setBusiness(
                    businessResult.map((bus: Business) => {
                        return {
                            address: bus.address,
                            businessEmail: bus.businessEmail,
                            businessId: bus.businessId,
                            businessLogoUrl: bus.businessLogoUrl,
                            businessName: bus.businessName,
                            description: bus.description,
                            facebookPage: bus.facebookPage,
                            ownerName: bus.ownerName,
                            startedAt: bus.startedAt,
                            status: bus.status,
                            timezone: bus.timezone,
                            type: bus.type
                        }
                    })
                );      
                console.log(business);
                const activeOne: Business = businessResult.find(buss => buss.businessId === userResult.message.lastBusinessIdImViewing)!;
                console.log(activeOne);
                setActiveBusiness({
                    address: activeOne.address,
                    businessEmail: activeOne.businessEmail,
                    businessId: activeOne.businessId,
                    businessLogoUrl: activeOne.businessLogoUrl,
                    businessName: activeOne.businessName,
                    description: activeOne.description,
                    facebookPage: activeOne.facebookPage,
                    ownerName: activeOne.ownerName,
                    startedAt: activeOne.startedAt,
                    timezone: activeOne.timezone,
                    status: activeOne.status,
                    type: activeOne.type
                })
            }
        };

        getUser();
    }, []);

    if(loading) {
        return <DaddysHomeLoader />
    }

    return <UserContext.Provider value={{ 
        user, 
        setUser, 
        loading, 
        setLoading, 
        business, 
        setBusiness,
        activeBusiness,
        setActiveBusiness
    }}>
        { children } 
    </UserContext.Provider>

}

export function useUser() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used within UserProvider");
    }

    return context;
}