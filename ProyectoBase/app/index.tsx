import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Menú Principal</Text>
      
      <Button title="Inventario" onPress={() => router.push("/inventario")} />
      <Button title="Buscar Equipo" onPress={() => router.push("/buscar-equipo")} />
      <Button title="Modificar Equipo" onPress={() => router.push("/modificar-equipo")} />
      <Button title="Asignar Equipo" onPress={() => router.push("/asignar-equipo")} />
      <Button title="Mantenimientos" onPress={() => router.push("/mantenimientos")} />
      <Button title="Baja de Equipos" onPress={() => router.push("/baja-equipos")} />
      <Button title="Salida de Activos" onPress={() => router.push("/salida-activos")} />
      <Button title="Reportes" onPress={() => router.push("/reportes")} />
      <Button title="Agregar Incidente" onPress={() => router.push("/agregar-incidente")} />
    </View>
  );
}


