import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.timing(scale, { toValue: 0.95, duration: 1000, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scale, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContent}>
        <Ionicons name="home-outline" size={100} color="#3A4750" style={styles.iconMain} />

        <Text style={styles.welcomeText}>¡Hola, {user?.email || "Usuario"}!</Text>
        <Text style={styles.subText}>Bienvenido a tu panel de control</Text>

        {/* Botón Perfil */}
        <Animated.View style={[styles.animatedView, { transform: [{ scale }] }]}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push("/tabs/profile")}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Ionicons name="person-outline" size={28} color="white" />
            <Text style={styles.buttonText}>Perfil</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Botón Inventario */}
        <Animated.View style={[styles.animatedView, { transform: [{ scale }] }]}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push("/inventario")}
            onPressIn={handlePressOut}
            onPressOut={handlePressOut}
          >
            <Ionicons name="list-outline" size={28} color="white" />
            <Text style={styles.buttonText}>Inventario de Equipos</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Botón Agregar Equipo */}
        <Animated.View style={[styles.animatedView, { transform: [{ scale }] }]}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push("/agregar-equipo")}
            onPressIn={handlePressOut}
            onPressOut={handlePressOut}
          >
            <Ionicons name="cube-outline" size={28} color="white" />
            <Text style={styles.buttonText}>Agregar Equipo</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Botón Agregar Incidente */}
        <Animated.View style={[styles.animatedView, { transform: [{ scale }] }]}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push("/agregar-equipo")}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Ionicons name="add-circle-outline" size={28} color="white" />
            <Text style={styles.buttonText}>Agregar Incidente</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Botón Asignar Equipo */}
        <Animated.View style={[styles.animatedView, { transform: [{ scale }] }]}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push("/asignar-equipo")}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Ionicons name="people-outline" size={28} color="white" />
            <Text style={styles.buttonText}>Asignar Equipo</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Botón Baja Equipos */}
        <Animated.View style={[styles.animatedView, { transform: [{ scale }] }]}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push("/baja-equipos")}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Ionicons name="trash-outline" size={28} color="white" />
            <Text style={styles.buttonText}>Baja Equipos</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Botón Reportes */}
        <Animated.View style={[styles.animatedView, { transform: [{ scale }] }]}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push("/reportes")}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Ionicons name="bar-chart-outline" size={28} color="white" />
            <Text style={styles.buttonText}>Reportes</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Botón Mantenimientos */}
        <Animated.View style={[styles.animatedView, { transform: [{ scale }] }]}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push("/mantenimientos")}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Ionicons name="settings-outline" size={28} color="white" />
            <Text style={styles.buttonText}>Mantenimientos</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Botón Modificar Equipos */}
        <Animated.View style={[styles.animatedView, { transform: [{ scale }] }]}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push("/modificar-equipo")}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Ionicons name="create-outline" size={28} color="white" />
            <Text style={styles.buttonText}>Modificar Equipos</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Botón Cerrar Sesión */}
        <Animated.View style={[styles.animatedView, { transform: [{ scale }] }]}>
          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={() => { logout(); router.replace("/login"); }}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Ionicons name="log-out-outline" size={28} color="white" />
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  iconMain: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#3A4750",
    marginBottom: 5,
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    color: "#7D8C97",
    marginBottom: 30,
    textAlign: "center",
  },
  animatedView: {
    width: "85%",
    marginBottom: 15,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#D9534F",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
