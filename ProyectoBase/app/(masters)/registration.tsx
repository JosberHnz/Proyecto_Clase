import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  // Ejercicio 1: Manejo de estado con useState
  const [usuario, setUsuario] = useState({ nombre: '', edad: '' });

  return (
    <View style={styles.container}>
      {/* Ejercicio 1 */}
      <Text style={styles.title}>Formulario</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Nombre" 
        value={usuario.nombre} 
        onChangeText={(text) => setUsuario({ ...usuario, nombre: text })} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Edad" 
        keyboardType="numeric" 
        value={usuario.edad} 
        onChangeText={(text) => {
          if (/^\d*$/.test(text)) setUsuario({ ...usuario, edad: text });
        }}
      />
      <Text style={styles.message}>Hola, {usuario.nombre}. Tienes {usuario.edad} años.</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  input: { width: '80%', borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 },
  message: { fontSize: 16, marginVertical: 5 },
  alert: { fontSize: 16, color: 'red', fontWeight: 'bold' },
  clock: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 }
});
