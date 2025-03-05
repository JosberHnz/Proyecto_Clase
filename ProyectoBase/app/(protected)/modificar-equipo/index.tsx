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

export default function ModificarEquipo() {
  const [serviceTag, setServiceTag] = useState<string>(''); // Para ingresar el Service Tag
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

  const guardarCambios = async () => {
    if (equipo) {
      try {
        const equiposData = await AsyncStorage.getItem('equipos');
        if (equiposData) {
          const equipos = JSON.parse(equiposData);
          const index = equipos.findIndex((eq: Equipo) => eq.serviceTag === equipo.serviceTag);
          if (index !== -1) {
            equipos[index] = equipo;
            await AsyncStorage.setItem('equipos', JSON.stringify(equipos));
            Alert.alert('Equipo actualizado correctamente');
          }
        }
      } catch (error) {
        Alert.alert('Error al guardar los cambios');
      }
    }
  };

  if (!equipo) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Modificar Equipo</Text>
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
      <Text style={styles.header}>Modificar Equipo: {equipo.serviceTag}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={equipo.marca}
        onChangeText={(text) => setEquipo({ ...equipo, marca: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={equipo.modelo}
        onChangeText={(text) => setEquipo({ ...equipo, modelo: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Sistema Operativo"
        value={equipo.sistemaOperativo}
        onChangeText={(text) => setEquipo({ ...equipo, sistemaOperativo: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Memoria RAM"
        value={equipo.memoriaRAM}
        onChangeText={(text) => setEquipo({ ...equipo, memoriaRAM: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Disco Duro"
        value={equipo.discoDuro}
        onChangeText={(text) => setEquipo({ ...equipo, discoDuro: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Procesador"
        value={equipo.procesador}
        onChangeText={(text) => setEquipo({ ...equipo, procesador: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Departamento"
        value={equipo.departamento}
        onChangeText={(text) => setEquipo({ ...equipo, departamento: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={equipo.usuario}
        onChangeText={(text) => setEquipo({ ...equipo, usuario: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={equipo.estado}
        onChangeText={(text) => setEquipo({ ...equipo, estado: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Observaciones"
        value={equipo.observaciones}
        onChangeText={(text) => setEquipo({ ...equipo, observaciones: text })}
      />

      <Button title="Guardar Cambios" onPress={guardarCambios} />
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

