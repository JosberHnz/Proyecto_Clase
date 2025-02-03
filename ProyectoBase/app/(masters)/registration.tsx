import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  // Ejercicio 1: Manejo de estado con useState
  const [usuario, setUsuario] = useState({ nombre: '', edad: '' });

    // Ejercicio 2: Contador con useState y useEffect
    const [contador, setContador] = useState(0);
    useEffect(() => {
      console.log(`El contador cambió: ${contador}`);
    }, [contador]);
  
    // Ejercicio 3: Reloj en tiempo real (useEffect con setInterval)
  const [hora, setHora] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setHora(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

      // Ejercicio 4: Simulación de carga (useEffect con setTimeout)
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCargando(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

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

      {/* Ejercicio 2 */}
      <Text style={styles.title}>Contador</Text>
      <Button title="Incrementar" onPress={() => setContador(contador + 1)} />
      <Text style={styles.message}>Contador: {contador}</Text>
      {contador % 5 === 0 && contador !== 0 && <Text style={styles.alert}>Ha alcanzado un múltiplo de 5</Text>}

      {/* Ejercicio 3 */}
      <Text style={styles.title}>Reloj Digital</Text>
      <Text style={styles.clock}>{hora.toLocaleTimeString()}</Text>

      {/* Ejercicio 4 */}
      <Text style={styles.title}>Pantalla de Carga</Text>
      <Text style={styles.message}>{cargando ? 'Cargando...' : 'Bienvenido a la aplicación'}</Text>

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
