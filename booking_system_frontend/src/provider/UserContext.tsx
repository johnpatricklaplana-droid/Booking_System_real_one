import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { get } from "../api/api";
import type { Business } from "../interfaces/Types";

interface User {
    firstName: string;
    lastName: string;
    profilePic: string | null;
    roles: string[];
    addres: string | null;
    phone: string | null;
    email: string;
    activeRole: string;
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

            const result = await get(url);

            if(result.status === 200) {
                setUser({
                    profilePic: result.message.avatarUrl,
                    firstName: result.message.firstName,
                    lastName: result.message.lastName,
                    roles: result.message.roles,
                    email: result.message.email,
                    addres: null,
                    phone: null,
                    activeRole: result.message.lastActiveRole
                });
                setLoading(false);
            }

            if(result.message.roles.includes("BUSINESS_OWNER")) {
                const url = "http://localhost:8080/api/business";

                const result = await get(url);

                console.log(result);

                setBusiness(
                    result.map((bus: any) => {
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
                            timezone: bus.timezone,
                            type: bus.type
                        }
                    })
                );        
                
                setActiveBusiness({
                    address: result?.[0].address,
                    businessEmail: result?.[0].businessEmail,
                    businessId: result?.[0].businessId,
                    businessLogoUrl: result?.[0].businessLogoUrl,
                    businessName: result?.[0].businessName,
                    description: result?.[0].description,
                    facebookPage: result?.[0].facebookPage,
                    ownerName: result?.[0].ownerName,
                    startedAt: result?.[0].startedAt,
                    timezone: result?.[0].timezone,
                    type: result?.[0].type
                })
            }
        };

        getUser();
    }, []);

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