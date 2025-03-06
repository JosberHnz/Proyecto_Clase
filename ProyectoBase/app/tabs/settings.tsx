import { View, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage, i18n } from "@/contexts/LanguageContext";
import { darkTheme, lightTheme } from "@/styles/themes";
import { useState } from "react";

export default function SettingsScreen() {
    const { theme, toggleTheme } = useTheme();
    const { language, changeLanguage } = useLanguage();
    const styles = theme === "dark" ? { ...darkTheme, picker: { width: 200, height: 50, color: "white" } } : { ...lightTheme, picker: { width: 200, height: 50, color: "black" } };
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Modo Actual: Claro | Oscuro</Text>
            <TouchableOpacity style={styles.button} onPress={toggleTheme}>
                <Text style={styles.buttonText}>Cambiar Tema</Text>
            </TouchableOpacity>

            {/* Selector de idioma */}
            <Text style={styles.text}>Idioma Actual: {i18n.t("welcome")}</Text>
            <Picker
                selectedValue={language}
                onValueChange={(itemValue) => changeLanguage(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Español" value="es" />
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Français" value="fr" />
                <Picker.Item label="Deutsch" value="de" />
            </Picker>
        </View>
    );
}
