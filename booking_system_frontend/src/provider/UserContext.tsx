import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

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
        fetch('/api/me')
            .then(res => res.json())
            .then(data => {
                setUser(data);
            })
            .catch(() => console.log("you are not super login"));
    }, []);

    return <UserContext.Provider value={{ user, setUser }}>
        { children } 
    </UserContext.Provider>

}

export function useUser() {
    return useContext(UserContext);
}