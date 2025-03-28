import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { darkTheme, lightTheme } from "@/styles/themes";
import { i18n } from "@/contexts/LanguageContext";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/app/store/slices/usuarioSlice";
import { RootState } from "@/app/store/store";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const auth = useAuth();
  const { theme } = useTheme();
  const themeStyles = theme === "dark" ? darkTheme : lightTheme;

  const dispatch = useDispatch();
  const usuario = useSelector((state: RootState) => state.usuario);

  const handleLogin = async () => {
    console.log("Verificando correo:", email);

    if (!email.endsWith(".edu")) {
      setErrorMessage("Solo correos .edu pueden ingresar.");
      setEmail("");
      return;
    }

    if (!auth?.login) {
      console.error("El contexto de autenticación no está disponible.");
      setErrorMessage("Error en la autenticación. Intenta más tarde.");
      return;
    }

    try {
      await auth.login(email);
      dispatch(setUser({ email }));
      router.replace("/home");
    } catch (error) {
      console.error("Error en el login:", error);
      setErrorMessage("No se pudo iniciar sesión. Verifica tu correo.");
    }
  };

  return (
    <View style={[themeStyles.container, styles.container]}>
      <Image source={require("../assets/images/profilepic.jpg")} style={styles.avatar} />
      <Text style={themeStyles.title}>{i18n.t("welcome")}</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton} onPress={() => { }}>
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" }}
          style={styles.googleIcon}
        />
        <Text style={styles.buttonText}>Ingresar con Google</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#4C6EF5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2D2E32",
    textAlign: "center",
  },
  linkText: { marginTop: 10, color: "#007bff", textDecorationLine: "underline" },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "#0e1733",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    marginBottom: 15,
  },
});
