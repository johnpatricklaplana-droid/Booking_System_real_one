import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { get } from "../api/api";

interface User {
    firstName: string;
    lastName: string;
    profilePic: string | null;
    roles: string[];
    addres: string | null;
    phone: string | null;
    email: string 
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider ({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {

            const url = "http://localhost:8080/api/super-me";

            const result = await get(url);

            setUser({
                profilePic: result.message.avatarUrl,
                firstName: result.message.firstName,
                lastName: result.message.lastName,
                roles: result.message.roles,
                email: result.message.email,
                addres: null,
                phone: null
            });
        };

        getUser();
    }, []);

    return <UserContext.Provider value={{ user, setUser }}>
        { children } 
    </UserContext.Provider>

}

export function useUser() {
    return useContext(UserContext);
}