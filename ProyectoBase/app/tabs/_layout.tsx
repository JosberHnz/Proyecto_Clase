import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function RootLayout() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <LanguageProvider>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                        }}
                    />
                </LanguageProvider>
            </AuthProvider>
        </ThemeProvider>

    );
}
