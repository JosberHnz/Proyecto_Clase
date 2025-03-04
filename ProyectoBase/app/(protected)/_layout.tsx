import { useAuth } from "@/contexts/AuthContext";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
    const { isAllowed } = useAuth();
    if (!isAllowed) return <Redirect href="/tabs/login" />
    return <Stack />
}