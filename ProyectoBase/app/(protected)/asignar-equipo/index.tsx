import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Equipo {
  tipo: string;
  marca: string;
  modelo: string;
  serviceTag: string;
  sistemaOperativo: string;
  memoriaRAM: string;
  discoDuro: string;
  procesador: string;
  departamento: string;
  usuario: string;
  estado: string;
  observaciones: string;
}

export default function AsignarEquipo() {
  const [serviceTag, setServiceTag] = useState<string>('');
  const [equipo, setEquipo] = useState<Equipo | null>(null);

  useEffect(() => {
    const loadEquipo = async () => {
      const equiposData = await AsyncStorage.getItem('equipos');
      if (equiposData) {
        const equipos = JSON.parse(equiposData);
        const equipoEncontrado = equipos.find((eq: Equipo) => eq.serviceTag === serviceTag);
        if (equipoEncontrado) {
          setEquipo(equipoEncontrado);
        } else {
          Alert.alert('No se encontró el equipo con ese Service Tag.');
        }
      }
    };

    if (serviceTag) {
      loadEquipo();
    }
  }, [serviceTag]);

  const asignarEquipo = async () => {
    if (equipo) {
      try {
        const equiposData = await AsyncStorage.getItem('equipos');
        if (equiposData) {
          const equipos = JSON.parse(equiposData);
          const index = equipos.findIndex((eq: Equipo) => eq.serviceTag === equipo.serviceTag);
          if (index !== -1) {
            equipos[index] = equipo;
            await AsyncStorage.setItem('equipos', JSON.stringify(equipos));
            Alert.alert('Equipo asignado correctamente');
          }
        }
      } catch (error) {
        Alert.alert('Error al asignar el equipo');
      }
    }
  };

  if (!equipo) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Asignar Equipo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese Service Tag"
          value={serviceTag}
          onChangeText={setServiceTag}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Asignar Equipo: {equipo.serviceTag}</Text>
      
      <Text style={styles.label}>Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={equipo.usuario}
        onChangeText={(text) => setEquipo({ ...equipo, usuario: text })}
      />
      
      <Text style={styles.label}>Departamento</Text>
      <TextInput
        style={styles.input}
        placeholder="Departamento"
        value={equipo.departamento}
        onChangeText={(text) => setEquipo({ ...equipo, departamento: text })}
      />
      
      <Text style={styles.label}>Observaciones</Text>
      <TextInput
        style={styles.input}
        placeholder="Observaciones"
        value={equipo.observaciones}
        onChangeText={(text) => setEquipo({ ...equipo, observaciones: text })}
      />

      <Button title="Asignar Equipo" onPress={asignarEquipo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
    backgroundColor: '#fff',
  },
});

