import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = { email: string } | null;

const AuthContext = createContext<{
    user: User,
    isAllowed: boolean;
    login: (email: string) => void;
    logout: () => void;
} | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>(null);
    const [isAllowed, setIsAllowed] = useState<boolean>(false);

    useEffect(() => {
        const loadStoredUser = async () => {
            const storedUser = await AsyncStorage.getItem("user");
            const storedAllowed = await AsyncStorage.getItem("isAllowed");
            if (storedUser && storedAllowed === "true") {
                setUser(JSON.parse(storedUser));
                setIsAllowed(true);
            }
        };
        loadStoredUser();
    }, []);

    const login = async (email: string) => {
        const isValidEmail = email.endsWith(".edu");
        if (isValidEmail) {
            const userData = { email };
            setUser(userData);
            setIsAllowed(true);
            await AsyncStorage.setItem("user", JSON.stringify(userData));
            await AsyncStorage.setItem("isAllowed", "true");
        } else {
            setUser(null);
            setIsAllowed(false);
            alert("Solo correos .edu pueden ingresar");
        }
    };

    const logout = async () => {
        setUser(null);
        setIsAllowed(false);
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("isAllowed");
    };

    return (
        <AuthContext.Provider value={{ user, isAllowed, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


