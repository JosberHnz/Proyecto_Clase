import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = "help";

                    if (route.name === "index") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "profile") {
                        iconName = focused ? "person" : "person-outline";
                    } else if (route.name === "settings") {
                        iconName = focused ? "settings" : "settings-outline";
                    }

                    return <Ionicons name={iconName} size={size || 24} color={color} />;
                },
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "gray",
                headerShown: false,
            })}
        />
    );
}

