import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function SalidaActivos() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Salida de Activos</Text>
      <Button title="Volver al Menú" onPress={() => router.push("/")} />
    </View>
  );
}
