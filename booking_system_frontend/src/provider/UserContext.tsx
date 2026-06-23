import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { get } from "../api/api";

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
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider ({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getUser = async () => {

            const url = "http://localhost:8080/api/super-me";

            const result = await get(url);
            console.log("Happening?");
            console.log(result);

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
        };

        getUser();
    }, []);

    return <UserContext.Provider value={{ user, setUser, loading, setLoading}}>
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