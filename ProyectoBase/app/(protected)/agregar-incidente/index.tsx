import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function AgregarIncidente() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Agregar Incidente</Text>
      <Button title="Volver al Menú" onPress={() => router.push("/")} />
    </View>
  );
}
