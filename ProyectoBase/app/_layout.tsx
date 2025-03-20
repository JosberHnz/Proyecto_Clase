import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/app/store/store';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function RootLayout() {
    return (
        <Provider store={store}>
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
        </Provider>
    );
}
